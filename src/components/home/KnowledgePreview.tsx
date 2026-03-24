import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const KnowledgePreview = () => {
  const { data: posts } = useBlogPosts();
  const displayPosts = posts?.slice(0, 3) || [];

  if (displayPosts.length === 0) return null;

  return (
    <section className="py-32 bg-[#f5f5f0]">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-gold text-[11px] tracking-[0.35em] uppercase mb-4">Knowledge</p>
            <h2 className="font-editorial text-4xl md:text-5xl text-foreground">
              read before you invest.
            </h2>
          </div>
          <Link
            to="/knowledge"
            className="hidden md:block text-sm text-muted-foreground hover:text-foreground border-b border-transparent hover:border-foreground/20 pb-1 transition-all"
          >
            All articles &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/knowledge/${post.slug}`}
                className="group block bg-white p-8 h-full border border-border hover:border-gold/20 transition-all"
              >
                <span className="text-[10px] font-medium text-gold uppercase tracking-[0.2em]">
                  {post.category}
                </span>
                <h3 className="font-editorial text-xl text-foreground mt-4 mb-3 group-hover:text-gold transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{post.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgePreview;
