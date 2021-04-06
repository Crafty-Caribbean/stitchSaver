import React from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import SearchSuggestions from '../SearchSuggestions';
import styles from './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedText: '',
      searchHover: false,
      searchSuggestionList: ['Suggestion A', 'Suggestion B', 'Suggestion C', 'Suggestion D', 'Suggestion E', 'Suggestion F', 'Suggestion G', 'Suggestion H'],
    };
    this.debounceSuggestions = this.debounceSuggestions.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.searchHover = this.searchHover.bind(this);
  }

  // Get request for searchbar
  // // Need suggestions
  // Suggestions for patterns, authors, tags, etc.

  // debounceSuggestions(func, delay) {
  //   let timer;
  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       func.apply(this, args);
  //     }, delay);
  //   };
  // }

  getSuggestions(searchedInput) {
    axios.get('/api/search', {
      params: {
        keyword: searchedInput,
      }
        .then((response) => {
          const searched = response.data;
          this.setState({ searchSuggestionList: searched });
        })
        .catch((error) => {
          console.log('Error fetching search suggestions: ', error);
        }),
    });
  }

  handleChange(event) {
    const inputtedText = event.target.value;
    this.setState({
      searchedText: inputtedText,
    });
    this.debounceSuggestions(this.getSuggestions(inputtedText), 1000);
  }

  handleSearch(event) {
    const { searchedText } = this.state;
    event.preventDefault();
    console.log('Query/search database for: ', searchedText);
    this.setState({ searchedText: '' });

    // API route will need to be user or author depending on clicked item
    // const type = ???????? (Will need to find a way to retrieve this info when clicked)
    // const id = ???????????
    // axios.get(`/${type}/${id}`, {
    //   params: {
    //     keyword: searchedText,
    //   }
    //     .then((response) => {
    //       const searched = response.data;
    //       this.setState({ searchSuggestionList: searched });
    //     })
    //     .catch((error) => {
    //       console.log('Error fetching search results: ', error);
    //     }),
    // });
  }

  searchHover(event) {
    event.preventDefault();
    const { searchHover } = this.state;
    this.setState({ searchHover: !searchHover });
  }

  render() {
    const { searchedText, searchHover, searchSuggestionList } = this.state;

    return (
      <div className={styles.searchBar}>
        <form onSubmit={this.handleSearch}>
          <div className={styles.searchContainer}>
            <div>
              <input
                className={styles.searchInput}
                // placeholder="Search"
                placeholder="Search"
                type="text"
                name="searchedText"
                value={searchedText}
                onChange={this.handleChange}
                autoComplete="off"
              />
              {searchedText.length > 0
              && (
                <div className={styles.searchSuggestions}>
                  {
                    searchSuggestionList.map((suggestion) => (
                      <SearchSuggestions suggestion={suggestion} />
                    ))
                  }
                </div>
              )}
            </div>
            <div
              className={styles.searchIconWrapper}
              onMouseEnter={this.searchHover}
              onMouseLeave={this.searchHover}
            >
              <FaSearch
                className={styles.searchIcon}
                size="25"
                color={searchHover ? 'black' : '#D1D1D1'}
                onClick={this.handleSearch}
              />
            </div>
          </div>
        </form>
</div>
    );
  }
}

export default SearchBar;

// Notes and experiments:

// This is for if I want to implement a button on top of the input that will display
// search icon - since placeholder is text only:
// <button className={styles.searchView} type="text" name="searchView">
// {magnifyingIcon} Search
// </button>

// Functional:

{/* <div className={styles.searchBar}>
<form onSubmit={this.handleSearch}>
  <div className={styles.searchContainer}>
    <div>
      <input
        className={styles.searchInput}
        // placeholder="Search"
        placeholder="Search"
        type="text"
        name="searchedText"
        value={searchedText}
        onChange={this.handleChange}
        autoComplete="off"
      />
      {searchedText.length > 0
      && <div className={styles.searchSuggestions}>This will be suggestions list</div>}
    </div>
    <div
      className={styles.searchIconWrapper}
      onMouseEnter={this.searchHover}
      onMouseLeave={this.searchHover}
    >
      <FaSearch
        className={styles.searchIcon}
        size="25"
        color={searchHover ? 'black' : '#D1D1D1'}
        onClick={this.handleSearch}
      />
    </div>
  </div>
</form>
</div> */}
