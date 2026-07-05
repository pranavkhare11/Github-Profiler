import { useParams, useNavigate } from "react-router";
import RepoList from "./RepoList";
import GistList from "./GistList";

interface ProfileTabsProps {
    login: string;
    publicRepos: number;
    publicGists: number;
}

const ProfileTabs = ({ login, publicRepos, publicGists }: ProfileTabsProps) => {
    const { tab } = useParams<{ tab?: string }>();
    const navigate = useNavigate();
    const activeTab = tab === "gists" ? "gists" : "repos";

    return (
        <>
            <div className="flex" style={{ marginTop: "14px" }}>
                <div
                    className={`pill ${activeTab === "repos" ? "active" : ""}`}
                    onClick={() => navigate(`/profile/${login}/repos`)}
                >
                    {activeTab === "repos" && <span className="tab-active-dot" style={{ marginRight: "6px" }} />}
                    Public Repos: {publicRepos}
                </div>
                <div
                    className={`pill ${activeTab === "gists" ? "active" : ""}`}
                    onClick={() => navigate(`/profile/${login}/gists`)}
                >
                    {activeTab === "gists" && <span className="tab-active-dot" style={{ marginRight: "6px" }} />}
                    Public Gists: {publicGists}
                </div>
            </div>

            <div className="tab-view-content">
                {activeTab === "repos" ? (
                    <RepoList login={login} />
                ) : (
                    <GistList login={login} />
                )}
            </div>
        </>
    );
};

export default ProfileTabs;