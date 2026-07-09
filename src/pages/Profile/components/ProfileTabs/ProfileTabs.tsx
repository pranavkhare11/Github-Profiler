import { useParams, useNavigate } from "react-router";
import RepoList from "@pages/Profile/components/RepoList/RepoList";
import GistList from "@pages/Profile/components/GistList/GistList";
import * as S from "./ProfileTabs.styles";

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
            <S.ProfileTabsFlex>
                <S.ProfileTabPill
                    $active={activeTab === "repos"}
                    onClick={() => navigate(`/profile/${login}/repos`)}
                >
                    {activeTab === "repos" && <S.TabActiveDot />}
                    Public Repos: {publicRepos}
                </S.ProfileTabPill>
                <S.ProfileTabPill
                    $active={activeTab === "gists"}
                    onClick={() => navigate(`/profile/${login}/gists`)}
                >
                    {activeTab === "gists" && <S.TabActiveDot />}
                    Public Gists: {publicGists}
                </S.ProfileTabPill>
            </S.ProfileTabsFlex>

            <S.TabViewContent>
                {activeTab === "repos" ? (
                    <RepoList login={login} totalCount={publicRepos} />
                ) : (
                    <GistList login={login} totalCount={publicGists} />
                )}
            </S.TabViewContent>
        </>
    );
};

export default ProfileTabs;
