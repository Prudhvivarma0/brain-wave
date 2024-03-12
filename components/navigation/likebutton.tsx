import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeButton: React.FC<{ postId: string, state:boolean }> = ({ postId,state }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    var update = state;

    useEffect(() => {
        axios.get(`/api/posts/${postId}`)
            .then(response => {
                setLikeCount(response.data.likeCount);
            })
            .catch(error => {
                console.error('Error fetching like count:', error);
            });
    }, [postId]);

    const handleLike = () => {
        setLiked(prevLiked => {
            const newLiked = !prevLiked;
            const newLikeCount = newLiked ? likeCount + 1 : likeCount - 1;
        setLikeCount(newLikeCount);
            return newLiked;
        });

        // Correctly determine if the user is liking or disliking the post based on the new state
        const update = !liked;
        axios.post(`/api/posts/${postId}`, { isLiking: !liked, stateLiked: update })
            .catch(error => {
                console.error('Error updating like count:', error);
            });
    };

    return (
        <div onClick={handleLike}>
            <button >
                {state || liked ? (
                    <span role="img" aria-label="Liked">
                        ❤️
                    </span>
                ) : (
                    <span role="img" aria-label="Not Liked">
                        🤍
                    </span>
                )}
            </button>
            <span>{likeCount}</span>
        </div>
    );
};

export default LikeButton;
