import { StyleSheet, View, FlatList } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { getDonationsList } from '../../utilities/routes/dontations';
import SearchBar from '../../components/UI/SearchBar';
import RenderItem from '../../components/Donations/RenderItem';
import NoResults from '../../components/Resources/NoResults';
import { showMessage } from 'react-native-flash-message';
import { GlobalStyles as gs } from '../../utilities/constants/styles';

export default function DonationsScreen({ navigation, route }) {
  const [donationResults, setDonationResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchDonations = useCallback(async () => {
    setIsLoading(true);
    const response = await getDonationsList();
    if (response.status === '200') {
      setDonationResults(response.results);
    } else {
      showMessage({
        message: response.message,
        type: 'warning',
        icon: 'warning',
      });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDonations();
    return () => {
      setDonationResults([]);
    };
  }, []);

  const onSearch = (text) => {
    const results = donationResults.filter((item) => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
    setSearchResults(results);
    setSearchText(text);
  };

  return (
    <View style={styles.rootContainer}>
      <SearchBar
        onChangeText={onSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <FlatList
        data={searchText === '' ? donationResults : searchResults}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item._id}
        keyboardDismissMode='on-drag'
        ListEmptyComponent={NoResults}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
        windowSize={10}
        contentContainerStyle={styles.listContent}
        style={styles.listContainer}
        refreshing={isLoading}
        onRefresh={fetchDonations}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: gs.colors.background,
  },
  searchBar: {
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 7,
  },
  searchBarText: {
    color: 'black',
    fontSize: 18,
  },
  listContainer: {},
  listContent: {},
  loaderContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loaderText: {
    marginVertical: '5%',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
