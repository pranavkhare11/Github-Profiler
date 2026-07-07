import { useState } from "react";
import { useParams } from "react-router";
import ProfileCard from "@pages/Profile/components/ProfileCard/ProfileCard";
import ProfileTabs from "@pages/Profile/components/ProfileTabs/ProfileTabs";
import type { GitHubUserProfile } from "@app-types/github";

const ProfilePage = () => {
    const { username } = useParams<{ username: string }>();
    const [profile, setProfile] = useState<GitHubUserProfile | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    return (
        <section className="panel content-panel">
            <ProfileCard 
                login={username || ""} 
                onProfileLoaded={setProfile}
                onFetching={setIsFetching}
            />
            
            {!isFetching && profile && (
                <ProfileTabs 
                    login={profile.login} 
                    publicRepos={profile.public_repos}
                    publicGists={profile.public_gists}
                />
            )}

            {!isFetching && (
                <div className="glyph-band" style={{ marginTop: "24px" }}>
                    <span className="glyph-dot" />
                    <span>module.profile.pending</span>
                </div>
            )}
        </section>
    );
};

export default ProfilePage;