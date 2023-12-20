const searchFormHandler = async (event) => {
    event.preventDefault();
  
    const query = document.querySelector("#movie-search").value.trim();
  
    if (query) {
      try {
        const response = await fetch(`/api/movies/search?query=${query}`);
        const searchResults = await response.json();
        console.log(searchResults);
      } catch (error) {
        console.error('I screwed up searching for movies:', error);
      }
    }
  };
  
  document.querySelector(".search-form").addEventListener("submit", searchFormHandler);
  