import React, { useState } from 'react';
import { ProductReview } from '../types/store';
import { Star, ThumbsUp, ShieldCheck, MessageSquare, X } from 'lucide-react';

interface ReviewsSectionProps {
  productName: string;
  productId: string;
  reviews: ProductReview[];
  onAddReview: (productId: string, review: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>) => void;
  onUpvoteReview: (productId: string, reviewId: string) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  productName,
  productId,
  reviews,
  onAddReview,
  onUpvoteReview
}) => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  // Compute stats
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '5.0';

  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    if (ratingCounts[r.rating] !== undefined) {
      ratingCounts[r.rating]++;
    }
  });

  const filteredReviews = filterRating === 'all'
    ? reviews
    : reviews.filter(r => r.rating === filterRating);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    onAddReview(productId, {
      author: newAuthor.trim(),
      rating: newRating,
      title: newTitle.trim() || 'Verified Customer Review',
      comment: newComment.trim(),
      verifiedPurchase: true
    });

    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
    setNewRating(5);
    setIsWritingReview(false);
  };

  const handleHelpfulClick = (reviewId: string) => {
    if (upvotedIds[reviewId]) return;
    setUpvotedIds(prev => ({ ...prev, [reviewId]: true }));
    onUpvoteReview(productId, reviewId);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header with Aggregate Rating and Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        {/* Score Column */}
        <div className="flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-slate-200">
          <span className="text-5xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
            {avgRating}
          </span>
          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(Number(avgRating))
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Based on {totalReviews} verified customer reviews
          </span>
          
          <button
            onClick={() => setIsWritingReview(true)}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Write a Review
          </button>
        </div>

        {/* Distribution Bars */}
        <div className="md:col-span-2 flex flex-col justify-center space-y-2 px-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingCounts[star] || 0;
            const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <button
                key={star}
                onClick={() => setFilterRating(filterRating === star ? 'all' : star)}
                className="flex items-center gap-3 text-xs text-left group hover:opacity-100 transition-opacity w-full cursor-pointer"
              >
                <span className="w-12 text-slate-600 font-mono font-medium flex items-center gap-1 group-hover:text-blue-600">
                  <span>{star}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                </span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-slate-400 font-mono tabular-nums text-[11px] font-medium">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
            Filter:
          </span>
          <button
            onClick={() => setFilterRating('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterRating === 'all'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            All ({totalReviews})
          </button>
          {[5, 4, 3].map((star) => (
            <button
              key={star}
              onClick={() => setFilterRating(star)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterRating === star
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
              }`}
            >
              {star} Stars ({ratingCounts[star] || 0})
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredReviews.length} reviews
        </div>
      </div>

      {/* 3. Write Review Modal / Inline Panel */}
      {isWritingReview && (
        <form onSubmit={handleSubmitReview} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Review for {productName}</span>
            </h4>
            <button
              type="button"
              onClick={() => setIsWritingReview(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Star Rating */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Overall Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 cursor-pointer focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= (hoverRating || newRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs text-slate-600 ml-2 font-mono font-bold">
                {hoverRating || newRating} / 5 Stars
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="e.g. Jason Miller"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Review Headline
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Exceptional sound and durable build"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Experience
            </label>
            <textarea
              required
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What did you like or dislike? How is the battery, sound, and build quality?"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsWritingReview(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Post Verified Review
            </button>
          </div>
        </form>
      )}

      {/* 4. Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No reviews matching this star rating yet.</p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-xs"
            >
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <h5 className="text-sm font-bold text-slate-900">{rev.title}</h5>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span>{rev.date}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {rev.comment}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{rev.author}</span>
                  {rev.verifiedPurchase && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleHelpfulClick(rev.id)}
                  disabled={upvotedIds[rev.id]}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer border ${
                    upvotedIds[rev.id]
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 cursor-default font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200'
                  }`}
                  aria-label="Mark review as helpful"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
