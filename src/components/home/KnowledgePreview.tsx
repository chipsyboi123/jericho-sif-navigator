import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const KnowledgePreview = () => {
  const { data: posts } = useBlogPosts();
  const displayPosts = posts?.slice(0, 3) || [];

  if (displayPosts.length === 0) return null;

  return (
    <section className="py-28 bg-[#FAF9F6]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <p className="text-[#C9960C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Knowledge Hub</p>
            <h2 className="font-serif-display text-3xl md:text-4xl text-foreground">
              Read. Understand. Invest.
            </h2>
          </div>
          <Link
            to="/knowledge"
            className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            All articles &rarr;
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                className="group block bg-white rounded-2xl border border-border p-6 h-full hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <span className="text-[10px] font-semibold text-[#C9960C] uppercase tracking-wider">
                  {post.category}
                </span>
                <h3 className="font-heading text-base font-bold text-foreground mt-3 mb-2 group-hover:text-[#C9960C] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgePreview;
