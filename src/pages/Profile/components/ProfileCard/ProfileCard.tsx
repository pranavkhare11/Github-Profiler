import { useProfileCard } from "./useProfileCard";
import type { GitHubUserProfile } from "@app-types/github";
import "./ProfileCard.css";

interface ProfileCardProps {
    login: string;
    onProfileLoaded: (profile: GitHubUserProfile | null) => void;
    onFetching: (isFetching: boolean) => void;
}

const ProfileCard = ({ login, onProfileLoaded, onFetching }: ProfileCardProps) => {
    const { userprofile, isFetching, navigate } = useProfileCard({
        login,
        onProfileLoaded,
        onFetching,
    });

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
