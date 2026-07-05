import SearchBar from "@pages/Search/components/SearchBar/SearchBar";
import heroImage from "@assets/hero.png";
import "./SearchPage.css";

const SearchPage = () => {
    return (
        <section className="search-page">
            <div className="search-content-left">
                <div className="search-header">
                    <div className="search-badge">SEARCH</div>
                    <h2 className="search-title">GitHub user lookup</h2>
                </div>
                <p className="search-subtitle">
                    Search any GitHub username and open the profile instantly with smart suggestions.
                </p>
                <SearchBar />
            </div>
            
            <div className="search-content-right">
                <div className="search-hero-image-container">
                    <div className="profile-lens-wrapper" style={{ width: "100%", height: "100%", borderRadius: "50%" }}>
                        <img 
                            src={heroImage} 
                            alt="Custom GitOS Hero Art" 
                            className="search-hero-img" 
                        />
                        <div className="profile-lens-reflection" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SearchPage;
