import SearchBar from "@pages/Search/components/SearchBar/SearchBar";
import "./SearchPage.css";

const SearchPage = () => {
    return (
        <section className="search-page">
            <div className="search-header">
                <div className="search-badge">SEARCH</div>
                <h2 className="search-title">GitHub user lookup</h2>
            </div>
            <p className="search-subtitle">
                Search any GitHub username and open the profile instantly with smart suggestions.
            </p>
            <SearchBar />
        </section>
    );
};

export default SearchPage;
