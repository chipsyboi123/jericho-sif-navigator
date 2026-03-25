import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const placeholderArticles = [
  { title: "SIF 101: Everything You Need to Know About India's Newest Asset Class", category: "Guide", date: "Jan 2025" },
  { title: "SIF vs PMS: A Detailed Comparison for Indian HNIs", category: "Comparison", date: "Feb 2025" },
  { title: "How Long-Short Equity Strategies Work (With Indian Market Examples)", category: "Strategy", date: "Feb 2025" },
  { title: "SIF Taxation Explained: Equity, Debt, and Hybrid Schemes", category: "Tax", date: "Jan 2025" },
  { title: "SIF vs AIF: Which Alternative Strategy Vehicle Is Right for You?", category: "Comparison", date: "Mar 2025" },
  { title: "All 13 SIF AMCs: Who's Launched, Who's Approved, Who's Coming", category: "Updates", date: "Feb 2025" },
  { title: "Comparing All Hybrid Long-Short SIFs: Magnum vs qSIF vs Altiva", category: "Comparison", date: "Mar 2025" },
  { title: "Is SIF Right for You? A Self-Assessment Framework", category: "Advisory", date: "Feb 2025" },
];

const categoryColors: Record<string, string> = {
  Guide: "bg-gold/10 text-gold",
  Comparison: "bg-blue-500/10 text-blue-600",
  Strategy: "bg-emerald-500/10 text-emerald-600",
  Tax: "bg-orange-500/10 text-orange-600",
  Regulatory: "bg-purple-500/10 text-purple-600",
  Updates: "bg-cyan-500/10 text-cyan-600",
  Advisory: "bg-yellow-500/10 text-yellow-700",
  education: "bg-gold/10 text-gold",
  strategy: "bg-emerald-500/10 text-emerald-600",
  tax: "bg-orange-500/10 text-orange-600",
  updates: "bg-cyan-500/10 text-cyan-600",
};

const KnowledgeHub = () => {
  const { data: publishedPosts } = useBlogPosts();

  // Build a set of published titles to avoid showing them as placeholders too
  const publishedTitles = new Set(publishedPosts?.map((p) => p.title) || []);

  return (
    <div className="py-20">
      <SEOHead title="Knowledge Hub" description="Deep-dive articles on SIF strategies, taxation, market updates, and investment education for Indian HNIs." />
      <div className="container mx-auto px-4">
        <div className="animate-fadeIn">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 text-foreground">
            Knowledge Hub
          </h1>
          <p className="text-muted-foreground text-lg mb-12">Deep-dive articles on SIF strategies, taxation, and market updates.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Published articles from Supabase */}
          {publishedPosts?.map((post, i) => (
            <Link to={`/knowledge/${post.slug}`} key={post.id}>
              <div
                className="bg-white/70 backdrop-blur-sm border border-border rounded-2xl shadow-card hover:shadow-card-hover hover:border-gold/30 hover:-translate-y-1 p-6 transition-all cursor-pointer h-full animate-fadeIn"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] || "bg-gold/10 text-gold"}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground hover:text-gold transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground mt-2">{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}

          {/* Placeholder articles not yet published */}
          {placeholderArticles
            .filter((a) => !publishedTitles.has(a.title))
            .map((article, i) => (
              <div
                key={article.title}
                className="bg-white/50 backdrop-blur-sm border border-border rounded-2xl p-6 opacity-60 animate-fadeIn"
                style={{ animationDelay: `${(publishedPosts?.length || 0 + i) * 50}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[article.category] || "bg-gold/10 text-gold"}`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">Coming soon, article in preparation.</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
