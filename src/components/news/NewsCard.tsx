
import { useState } from 'react';
import { ExternalLink, ThumbsUp, MessageSquare, Share2, Bookmark } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface NewsCardProps {
  id: string | number;
  title: string;
  summary: string;
  imageUrl: string;
  source: string;
  date: string;
  readTime: string;
  category: string;
  url?: string;
}

const NewsCard = ({
  id,
  title,
  summary,
  imageUrl,
  source,
  date,
  readTime,
  category,
  url
}: NewsCardProps) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className="overflow-hidden border hover:border-primary/50 transition-all duration-300 h-full flex flex-col animate-fade-in">
      <div className="relative overflow-hidden aspect-video">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-md">
            {category}
          </span>
        </div>
      </div>

      <CardContent className="pt-4 flex-grow">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>{source}</span>
          <span>{date} · {readTime} read</span>
        </div>

        <Link to={`/news/${id}`} className="hover:text-primary transition-colors">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        </Link>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-2">
          {truncateText(summary, 150)}
        </p>
      </CardContent>

      <CardFooter className="border-t pt-3 flex justify-between">
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 text-xs h-8"
            onClick={handleLike}
          >
            <ThumbsUp 
              size={14} 
              className={liked ? "fill-primary text-primary" : ""} 
            />
            <span>{likeCount}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs h-8">
            <MessageSquare size={14} />
            <span>{Math.floor(Math.random() * 20)}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs h-8">
            <Share2 size={14} />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8"
            onClick={handleBookmark}
          >
            <Bookmark 
              size={14} 
              className={bookmarked ? "fill-primary text-primary" : ""} 
            />
          </Button>

          {url && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 text-xs h-8"
              asChild
            >
              <a href={url} target="_blank" rel="noopener noreferrer">
                Read <ExternalLink size={12} />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
