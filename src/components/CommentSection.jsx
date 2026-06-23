"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

import {
  getComments,
  canComment,
  addComment,
  deleteComment,
} from "@/lib/api/comments";

export default function CommentSection({ artworkId }) {
  const { data: session } = useSession();

  const user = session?.user;

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [canUserComment, setCanUserComment] =
    useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] =
    useState(false);

  // Load comments
  const loadComments = async () => {
    try {
      const data = await getComments(artworkId);

      setComments(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Load comments initially
  useEffect(() => {
    const fetchComments = async () => {
      await loadComments();
      setLoading(false);
    };

    fetchComments();
  }, [artworkId]);

  // Check purchase permission
  useEffect(() => {
    if (!user?.email) return;

    const checkPermission = async () => {
      try {
        const result = await canComment(
          artworkId,
          user.email
        );

        setCanUserComment(
          result?.canComment || false
        );
      } catch (error) {
        console.error(error);
      }
    };

    checkPermission();
  }, [artworkId, user]);

  // Submit comment
  const handleComment = async () => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      setSubmitting(true);

      const result = await addComment(
        artworkId,
        {
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          comment,
        }
      );

      if (result.success) {
        toast.success("Comment added");

        setComment("");

        await loadComments();
      } else {
        toast.error(
          result.message ||
            "Failed to add comment"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete comment
  const handleDelete = async (commentId) => {
    const confirmDelete = window.confirm(
      "Delete this comment?"
    );

    if (!confirmDelete) return;

    try {
      await deleteComment(commentId);

      toast.success("Comment deleted");

      await loadComments();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete comment"
      );
    }
  };

  return (
    <div className="mt-10 space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Comments
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Buyers who purchased this artwork
          can leave comments.
        </p>
      </div>

      {/* Comment Form */}
      {canUserComment && (
        <div className="bg-[#111119] border border-white/10 rounded-2xl p-5">
          <textarea
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            rows={4}
            placeholder="Write your thoughts about this artwork..."
            className="w-full rounded-xl bg-[#0A0A0F] border border-white/10 p-4 text-white outline-none resize-none"
          />

          <button
            onClick={handleComment}
            disabled={submitting}
            className="mt-4 px-5 py-2 rounded-xl bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] text-white font-medium"
          >
            {submitting
              ? "Submitting..."
              : "Post Comment"}
          </button>
        </div>
      )}

      {/* Not Purchased */}
      {user && !canUserComment && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-sm text-yellow-300">
          Purchase this artwork to leave a
          comment.
        </div>
      )}

      {/* Comment List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-slate-400">
            Loading comments...
          </p>
        ) : comments.length === 0 ? (
          <div className="bg-[#111119] border border-white/10 rounded-xl p-5 text-slate-400">
            No comments yet.
          </div>
        ) : (
          comments.map((item) => (
            <div
              key={item._id}
              className="bg-[#111119] border border-white/10 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">
                    {item.userName}
                  </h4>

                  <p className="text-xs text-slate-500">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                {item.userEmail ===
                  user?.email && (
                  <button
                    onClick={() =>
                      handleDelete(item._id)
                    }
                    className="text-red-400 text-sm hover:text-red-300"
                  >
                    Delete
                  </button>
                )}
              </div>

              <p className="mt-3 text-slate-300 leading-relaxed">
                {item.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}