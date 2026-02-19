import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useBlogPost } from "@/hooks/useBlogPosts";
import SEOHead from "@/components/SEOHead";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug);

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            This article does not exist or has not been published yet.
          </p>
          <Link
            to="/knowledge"
            className="px-6 py-3 bg-gradient-gold text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Knowledge Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          author: { "@type": "Organization", name: "Jericho Ventures" },
          publisher: { "@type": "Organization", name: "Jericho Ventures" },
          description: post.excerpt,
        }}
      />
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/knowledge" className="hover:text-gold transition-colors">
            Knowledge Hub
          </Link>
          <span>/</span>
          <span className="text-foreground truncate">{post.title}</span>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-10">
            <span className="text-xs font-semibold text-gold uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mt-2 mb-3 text-foreground">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span>|</span>
              <span>{post.publishedAt}</span>
            </div>
          </div>

          {/* Markdown Content */}
          <div className="prose prose-gold max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 bg-white border border-[#E5E2DB] shadow-card">
            <h3 className="font-serif text-lg font-bold text-foreground mb-2">
              Ready to explore SIF?
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Talk to our advisory team to find the right SIF strategy for your portfolio.
            </p>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-gradient-gold text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Schedule a Consultation
            </Link>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogArticle;
