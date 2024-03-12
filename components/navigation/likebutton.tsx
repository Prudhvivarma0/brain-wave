import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeButton: React.FC<{ postId: string }> = ({ postId }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

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
        setLiked(!liked);
        const newLikeCount = liked ? likeCount - 1 : likeCount + 1;
        setLikeCount(newLikeCount);

        axios.post(`/api/posts/${postId}`)
            .catch(error => {
                console.error('Error updating like count:', error);
            });
    };

    return (
        <div onClick={handleLike}>
            <button >
                {liked ? (
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