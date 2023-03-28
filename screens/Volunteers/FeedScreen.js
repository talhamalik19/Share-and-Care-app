import { StyleSheet, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import RenderItem from '../../components/Volunteers/RenderItem';
import NoResults from '../../components/Resources/NoResults';
import SearchBar from '../../components/UI/SearchBar';
import { useSelector } from 'react-redux';
import { getVolunteerRequests } from '../../utilities/routes/volunteers';
import { showMessage } from 'react-native-flash-message';
import { GlobalStyles as gs } from '../../utilities/constants/styles';

export default function FeedScreen({ navigation, route }) {
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  const { screen } = route.params;

  const user = useSelector((state) => state.user);

  const fetchVolunteerRequests = async () => {
    setIsLoading(true);
    const response = await getVolunteerRequests();
    if (response.status === '200') {
      filterRequests(response.results);
    } else {
      showMessage({
        message: response.message,
        type: 'warning',
        icon: 'warning',
      });
    }
    setIsLoading(false);
  };

  const filterRequests = (volunteers) => {
    if (screen === 'all') {
      const filtered = volunteers.filter(
        (item) =>
          item.requestStatus === 'Enabled' &&
          !item.applicants.find(
            (applicant) => applicant.applicantEmail === user.email
          ) &&
          item.ignoredBy.includes(user.email) === false
      );
      setFilteredRequests(filtered.reverse());
    } else if (screen === 'myRequests') {
      const filtered = volunteers.filter((request) =>
        request.applicants.find(
          (applicant) => applicant.applicantEmail === user.email
        )
      );
      setFilteredRequests(filtered.reverse());
    }
  };

  const onSearch = (text) => {
    const results = filteredRequests.filter((item) => {
      return item.volunteerRequestTitle
        .toLowerCase()
        .includes(text.toLowerCase());
    });
    setSearchResults(results);
    setSearchText(text);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchVolunteerRequests();
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.rootContainer}>
      <SearchBar
        onChangeText={onSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <FlatList
        data={searchText === '' ? filteredRequests : searchResults}
        renderItem={({ item }) => <RenderItem item={item} screen={screen} />}
        keyExtractor={(item) => item._id.toString()}
        keyboardDismissMode='on-drag'
        ListEmptyComponent={NoResults}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
        windowSize={10}
        contentContainerStyle={styles.listContent}
        style={styles.listContainer}
        onRefresh={fetchVolunteerRequests}
        refreshing={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: gs.colors.background,
    paddingVertical: '4%',
  },

  listContainer: {},
  listContent: {},
});
