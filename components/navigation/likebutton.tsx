import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeButton: React.FC<{ postId: string, initialLikedByCurrentUser: boolean }> = ({ postId, initialLikedByCurrentUser }) => {
    const [liked, setLiked] = useState(initialLikedByCurrentUser);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        // Load the liked state from localStorage
        const storedLiked = localStorage.getItem(`liked_${postId}`);
        if (storedLiked !== null) {
            setLiked(storedLiked === 'true');
        }

        axios.get(`/api/posts/${postId}`)
            .then(response => {
                setLikeCount(response.data.likeCount);
            })
            .catch(error => {
                console.error('Error fetching like count:', error);
            });
    }, [postId]);

    const handleLike = () => {
        const newLiked = !liked;
        setLiked(newLiked);

        // Store the liked state in localStorage
        localStorage.setItem(`liked_${postId}`, newLiked.toString());

        const newLikeCount = newLiked ? likeCount + 1 : likeCount - 1;
        setLikeCount(newLikeCount);

        axios.post(`/api/posts/${postId}`, { isLiking: newLiked })
            .catch(error => {
                console.error('Error updating like count:', error);
            });
    };

    return (
        <button onClick={handleLike}>
            {liked ? (
                <span style={{ color: 'red' }}>&#10084;</span>
            ) : likeCount > 0 ? (
                <span>&#9825;</span>
            ) : (
                <span>&#9825;</span>
            )}
            {likeCount}
        </button>
    );
};

export default LikeButton;
