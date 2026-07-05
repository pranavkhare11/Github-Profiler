import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { userProfile } from "../../api/github";
import type { GitHubUserProfile } from "../../types/github";

interface ProfileCardProps {
    login: string;
    onProfileLoaded: (profile: GitHubUserProfile | null) => void;
    onFetching: (isFetching: boolean) => void;
}

const ProfileCard = ({ login, onProfileLoaded, onFetching }: ProfileCardProps) => {
    const navigate = useNavigate();
    const [userprofile, setUserprofile] = useState<GitHubUserProfile | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const loadUserProfile = async () => {
            try {
                setIsFetching(true);
                onFetching(true);
                setUserprofile(null);
                onProfileLoaded(null);

                const startTime = Date.now();
                const data = await userProfile(login, controller.signal);

                const elapsed = Date.now() - startTime;
                const minDelay = 1200;
                if (elapsed < minDelay) {
                    await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed));
                }

                if (!controller.signal.aborted) {
                    setUserprofile(data);
                    onProfileLoaded(data);
                }
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== "CanceledError") {
                    console.error("Error fetching user profile:", error);
                    if (!controller.signal.aborted) {
                        setUserprofile(null);
                        onProfileLoaded(null);
                    }
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsFetching(false);
                    onFetching(false);
                }
            }
        };

        if (login) {
            loadUserProfile();
        } else {
            setUserprofile(null);
            onProfileLoaded(null);
        }

        return () => {
            controller.abort();
        };
    }, [login]);

    return (
        <>
            {isFetching ? (
                <div className="glyph-band">
                    <span className="glyph-dot" />
                    <span>Fetching profile from Neural Spine<span className="loading-dots" /></span>
                </div>
            ) : userprofile ? (
                <div className="profile-card-wrapper">
                    <div className="meta-chip">Profile</div>
                    <div className="profile-details-card">
                        <div className="profile-avatar-zone">
                            <div className="profile-avatar-coil-ring">
                                <div className="profile-lens-wrapper">
                                    <img src={userprofile.avatar_url} alt={userprofile.login} className="profile-avatar-img" />
                                    <div className="profile-lens-reflection" />
                                    <span className="profile-red-indicator" />
                                </div>
                            </div>
                        </div>

                        <div className="profile-info-zone">
                            <div className="profile-meta-header">
                                <span className="profile-username-tag">@{userprofile.login}</span>
                                {userprofile.location && <span className="profile-location-tag">{userprofile.location}</span>}
                            </div>
                            <h1 className="profile-name">{userprofile.name || userprofile.login}</h1>
                            {userprofile.bio && <p className="profile-bio">{userprofile.bio}</p>}

                            <p className="profile-text-detail clickable-detail" onClick={() => navigate(`/profile/${userprofile.login}/followers`)}>Followers: {userprofile.followers}</p>
                            <p className="profile-text-detail clickable-detail" onClick={() => navigate(`/profile/${userprofile.login}/following`)}>Following: {userprofile.following}</p>
                            {userprofile.email && (
                                <p className="profile-text-detail">
                                    Email: <a href={`mailto:${userprofile.email}`} className="email-value">{userprofile.email}</a>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="status-text">No profile found</div>
            )}
        </>
    );
};

export default ProfileCard;