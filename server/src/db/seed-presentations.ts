import { pool } from "../config/db.js";
import "../config/env.js";

async function seedPresentationData() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // ===== 1. iSIF Hybrid Long-Short Fund =====
    await client.query(`
      UPDATE sif_funds SET
        benchmark = 'CRISIL Hybrid 50+50 Moderate Index',
        objective = 'The Investment Strategy intends to predominantly invest in equity and equity related securities with an aim to achieve capital appreciation over long term and also invest in Debt instruments & Units of InVITs to generate regular income. The Investment Strategy can also adopt equity and debt derivative strategies.',
        fund_managers = $1,
        fund_type = 'interval',
        exit_load = '1% of applicable NAV if redeemed/switched within 12 months from allotment. NIL after 12 months.',
        redemption_terms = 'Twice a week (Monday and Wednesday). If non-business day, processed next business day.',
        risk_band = 3,
        indicative_allocation = $2,
        nfo_open_date = '2026-01-16',
        nfo_close_date = '2026-01-30',
        tagline = 'Balancing convictions in unbalanced markets',
        subscription_frequency = 'Daily',
        plans_and_options = 'Regular Plan, Direct Plan / Growth Option',
        features = 'Lumpsum, SIP',
        min_sip_amount = 'Daily: Rs 5,000 (min 6 installments); Weekly/Fortnightly/Monthly: Rs 10,000 (min 6); Quarterly: Rs 20,000 (min 4)',
        sip_options = $3,
        taxation = $4,
        investment_approach = 'Layer 1 (Outer Crust): Equity & Equity Related instruments 65-75%. Layer 2 (Mantle): Debt/Cash 25-35% including margin money. Layer 3 (Outer Core): Derivatives up to 100% of net assets. Layer 4 (Inner Core): Special Situations - IPO/QIP/Buybacks participation. Net Equity range: -7.5% to 75%. Unhedged Equity: up to 25% of net assets (intended <10%). Units issued by InvITs: 0-10%.',
        why_invest = $5,
        derivative_strategies = $6,
        alpha_strategies = $7,
        risk_management = 'Market trigger-based allocation model using Price to Book, Currency/REER, Earnings yield vs Bond yield, RSI indicators. Undervalued (P/B <3.0): 65-75% net equity; Range Bound (3.0-3.7): 25-65% net equity; Overvalued (>3.7): 0-25% net equity with 40-100% derivative allocation.',
        fund_manager_details = $8,
        benchmark_risk_band = 3,
        website_url = 'https://isif.icicipruamc.com',
        research_team_size = '23 analysts covering 655+ companies across 24 sectors',
        aum_info = 'INR 59,107 crores in equity derivatives across mutual fund schemes',
        back_tested_performance = $9,
        portfolio_strategy_detail = $10
      WHERE slug = 'icici-isif-hybrid'
    `, [
      JSON.stringify(["Rajat Chandak (Equity)", "Ayush Shah (Equity)", "Manish Banthia (Debt)", "Akhil Kakkar (Debt)"]),
      JSON.stringify({ equity: 70, debt: 30, derivatives: 0 }),
      JSON.stringify({ daily: "5000", weekly: "10000", fortnightly: "10000", monthly: "10000", quarterly: "20000" }),
      JSON.stringify({ stcg: "20% tax on investments held for up to 12 months", ltcg: "12.5% tax on investments held for more than 12 months" }),
      JSON.stringify([
        "Equity & Debt Holding - Diversified exposure across asset classes",
        "Reduced Volatility - Long-short strategies aim to lower portfolio volatility",
        "Potential to Perform in Market Downturn - Derivative hedging provides downside protection",
        "Better Risk-Adjusted Returns - Combination of strategies optimizes risk-reward"
      ]),
      JSON.stringify(["Arbitrage (Cash-Futures)", "Covered Call", "Protective Put (Buying Stock Puts)", "Directional Strategies"]),
      JSON.stringify([
        "Stock and Sector Selection - Active allocation based on market outlook and relative valuations",
        "Derivative Strategies - Covered calls, options and other permitted structures to enhance returns",
        "Carry-Based Debt Strategies - Corporate bonds, commercial papers, certificates of deposit",
        "Capital Market Opportunities - Participation in IPOs, QIPs, block deals, buybacks"
      ]),
      JSON.stringify([
        { name: "Rajat Chandak", designation: "Fund Manager - Equity", experience: "Part of ICICI Prudential's equity team", bio: "Manages equity allocation with focus on bottom-up stock picking driven by in-depth research." },
        { name: "Ayush Shah", designation: "Fund Manager - Equity", experience: "Part of ICICI Prudential's equity team", bio: "Co-manages equity portfolio with focus on derivatives and hedging strategies." },
        { name: "Manish Banthia", designation: "Fund Manager - Debt", experience: "Senior debt fund manager at ICICI Prudential", bio: "Manages fixed income allocation with focus on accrual and tactical duration." },
        { name: "Akhil Kakkar", designation: "Fund Manager - Debt", experience: "Part of ICICI Prudential's fixed income team", bio: "Co-manages debt portfolio allocation." }
      ]),
      JSON.stringify({
        summary: "FY2015-FY2025 back-tested: 13.3% CAGR, 10.4% volatility vs Nifty 50 TRI 13.2% CAGR with 16.5% volatility",
        annual: [
          { year: "FY2015", return: "31%", benchmark: "28%", equity_level: "63%" },
          { year: "FY2016", return: "-2%", benchmark: "-8%", equity_level: "70%" },
          { year: "FY2017", return: "20%", benchmark: "20%", equity_level: "71%" },
          { year: "FY2018", return: "12%", benchmark: "12%", equity_level: "42%" },
          { year: "FY2019", return: "10%", benchmark: "16%", equity_level: "43%" },
          { year: "FY2020", return: "-15%", benchmark: "-25%", equity_level: "58%" },
          { year: "FY2021", return: "56%", benchmark: "73%", equity_level: "57%" },
          { year: "FY2022", return: "12%", benchmark: "20%", equity_level: "21%" },
          { year: "FY2023", return: "5%", benchmark: "1%", equity_level: "34%" },
          { year: "FY2024", return: "23%", benchmark: "30%", equity_level: "38%" },
          { year: "FY2025", return: "11%", benchmark: "7%", equity_level: "28%" }
        ],
        absolute_return: "333%",
        cagr: "13.3%",
        volatility: "10.4%"
      }),
      JSON.stringify({
        undervalued: { nifty_pb: "<3.0", net_equity: "65-75%", derivatives: "0-10%" },
        range_bound: { nifty_pb: "3.0-3.7", net_equity: "25-65%", derivatives: "0-40%" },
        overvalued: { nifty_pb: ">3.7", net_equity: "0-25%", derivatives: "40-100%" }
      })
    ]);
    console.log("  -> iSIF Hybrid Long-Short updated");

    // ===== 2. Magnum Hybrid Long-Short Fund =====
    await client.query(`
      UPDATE sif_funds SET
        benchmark = 'NIFTY 50 Hybrid Composite Debt 50:50 Index TRI',
        objective = 'The investment objective is to generate regular income by predominantly investing in Derivatives strategies like covered calls, arbitrage opportunities in the cash and derivatives segments of the equity markets and debt and money market instruments and to generate long-term capital appreciation through unhedged exposure to equity and equity related instruments.',
        fund_type = 'interval',
        subscription_frequency = 'Daily',
        redemption_terms = 'Twice a week (Monday and Thursday)',
        plans_and_options = 'Direct and Regular Plans with Growth and IDCW Options',
        exit_load = '0.50% up to 15 days, 0.25% from 16 days to 1 month, No Exit Load after 1 month',
        notice_period = 'NIL',
        exchange_listing = 'National Stock Exchange & Bombay Stock Exchange',
        features = 'Lumpsum, SIP',
        indicative_allocation = $1,
        tagline = 'Best of Both Worlds - Taxation Benefit of Mutual Fund, Flexibility of AIF',
        taxation = $2,
        why_invest = $3,
        investment_approach = 'Large cap skewed equity portfolio for ease in execution, agility and lower cost. Fixed income strategy for accrual-oriented portfolio providing stable income generation and liquidity for margin placement. Derivatives allocation for arbitrage opportunities, collar strategies, and select unhedged short positions used for hedging and income generation. Focus on equities with derivatives available to optimize risk management.',
        derivative_strategies = $4,
        portfolio_strategy_detail = $5,
        risk_band = 1,
        benchmark_risk_band = 3
      WHERE slug = 'sbi-magnum'
    `, [
      JSON.stringify({ equity: 55, debt: 30, derivatives: 15 }),
      JSON.stringify({ stcg: "20% tax on investments held for up to 12 months", ltcg: "12.5% tax on investments held for more than 12 months" }),
      JSON.stringify([
        "Reduced Volatility - Long-short strategies reduce overall portfolio volatility",
        "Potential to Earn in Market Downturn - Derivative hedging captures opportunities in falling markets",
        "Better Risk-Adjusted Returns - Multi-strategy approach optimizes risk-reward profile",
        "Equity Taxation - Tax-efficient structure with mutual fund pass-through taxation",
        "Multi-Asset Holding - Balanced exposure across equity, debt, and derivatives"
      ]),
      JSON.stringify(["Arbitrage (Cash-Futures)", "Covered Call", "Collar Strategy (Protective Put + Covered Call)", "Select Unhedged Short Positions"]),
      JSON.stringify({
        gross_equity: "65-75%",
        covered_equity: "0-10%",
        net_equity: "55-75%",
        unhedged_derivatives: "0-25%",
        debt: "25-35%",
        reits_invits: "0-10%"
      })
    ]);
    console.log("  -> Magnum Hybrid Long-Short updated");

    // ===== 3. qSIF Equity Long-Short Fund =====
    await client.query(`
      UPDATE sif_funds SET
        benchmark = 'NIFTY 500 Total Return Index (TRI)',
        objective = 'To generate long-term capital appreciation by investing in a diversified portfolio of equity and equity-related instruments while employing limited short exposure through derivatives to enhance returns and manage risk efficiently.',
        fund_type = 'open_ended',
        nfo_open_date = '2025-09-17',
        nfo_close_date = '2025-10-01',
        allotment_date = '2025-10-07',
        exit_load = '1% if redeemed/switched out on or before completion of 15 days from date of allotment of units',
        plans_and_options = 'Growth Option + IDCW (Payout & Reinvestment) in Direct & Regular Plans',
        min_sip_amount = 'SIP: Rs 10,000 and multiples of Re 1. Additional Purchase: Rs 10,00,000. Repurchase: Rs 10,000',
        sip_options = $1,
        features = 'Lumpsum, SIP',
        risk_band = 5,
        benchmark_risk_band = 5,
        tagline = 'A New Reality - Based on Systematic Active Investing',
        subscription_frequency = 'Daily (post NFO)',
        redemption_terms = 'Every Tuesday and Wednesday',
        investment_approach = 'Flexi Cap long-short strategy benefiting from unconstrained market capitalization-agnostic portfolio with long & short options via extensive derivative usage within SEBI limits. Powered by proprietary MARCOV investment framework and quantamine platform with High Frequency Analytics (HFA). Systematic Active Investing combines structural discipline of passive investing with adaptability of discretionary active management. HFA:LFA ratio of 70:30 (vs 30:70 for regular MF schemes).',
        indicative_allocation = $2,
        taxation = $3,
        why_invest = $4,
        derivative_strategies = $5,
        website_url = 'https://invest.qsif.com/sifInvestor/',
        fund_manager_details = $6,
        portfolio_strategy_detail = $7,
        research_team_size = 'Proprietary quantamine platform with 75 engineers at peak. AUM grown from INR 200 crore to INR 96,000 crore in 4 years. 9.6 million folios.'
      WHERE slug = 'quant-qsif-equity'
    `, [
      JSON.stringify({ sip: "10000" }),
      JSON.stringify({ equity: 75, debt: 5, derivatives: 20 }),
      JSON.stringify({ stcg: "20% tax on investments held for up to 12 months", ltcg: "12.5% tax on investments held for more than 12 months" }),
      JSON.stringify([
        "Lower Portfolio Volatility - Enhanced diversification reduces dependence on broad market movements",
        "Lower Drawdowns During Consolidation - Steadier performance via opportunistic directional short positions",
        "Lower Net Market Exposure - Flexibility to dynamically adjust gross long & short exposure",
        "Flexibility and Active Management - Dynamic risk exposure adjustment independent of rigid benchmark constraints",
        "Additional Alpha from Short Positions - Short exposure in underperforming asset classes and during consolidation phases"
      ]),
      JSON.stringify(["Arbitrage", "Covered Call", "Bear Put Spread", "Long Straddle", "Protective Put", "Bear Call Spread", "Short Call", "Short Put", "Short Straddle"]),
      JSON.stringify([
        { name: "Sandeep Tandon", designation: "Founder & Chief Investment Officer", experience: "33+ years in capital markets", bio: "Founder & CIO who built quant MF from under INR 200 crore to INR 96,000 crore AUM in 4 years. Pioneer in quantitative research and multivariate investment strategies. Started career in FY 1992-93 with GIC Mutual Fund. Built the predictive analytics framework and dynamic VLRT investment framework. Authored 'Being Relevant' and 'quantamine: inception to infinity'. Global macro strategist with deep understanding of credit, commodities, equities and digital currencies." },
        { name: "Lokesh Garg", designation: "Money Manager", experience: "20 years in equity markets", bio: "Two decades experience with Kotak Institutional Equities and Credit Suisse/UBS. MBA from IIM Ahmedabad, B.Tech from IIT Roorkee with University Gold Medal. CFA Level III. Previously Executive Director at UBS India Institutional Equities. Highly ranked analyst across multiple sectors." },
        { name: "Sameer Kate", designation: "Money Manager", experience: "20+ years in equities and derivatives", bio: "Over two decades of experience in Indian equities and derivatives dealing. Previously Sr. Sales Trader at Investec Capital and 16 years at Kotak Securities. Bachelor of Computer Science from Pune University, MBA from IME Pune." },
        { name: "Ankit Pande", designation: "Money Manager", experience: "13+ years in Indian equities", bio: "Started career in core banking software with Infosys Finacle. CFA charter holder. MBA from The Chinese University of Hong Kong (Dean's List). Won Thomson Reuters StarMine Award for best stock picker in IT sector (2014). Lifetime member of Beta Gamma Sigma honour society." },
        { name: "Sanjeev Sharma", designation: "Money Manager", experience: "18+ years in capital markets", bio: "Associated with quant mutual fund since 2005. Specializes in credit risk analysis and monitoring investment opportunities across asset classes. M.Com, PG Diploma in Business Administration (Finance), Certified Treasury Manager (Forex & Risk Management)." }
      ]),
      JSON.stringify({
        all_cap_cash_equity: "65-100%",
        unhedged_long: "0-35%",
        unhedged_short: "0-25%",
        hedging: "0-100%",
        margins: "0-15%",
        min_equity_exposure: "80% (Long + Short)"
      })
    ]);
    console.log("  -> qSIF Equity Long-Short updated");

    // ===== 4. Altiva Hybrid Long-Short Fund =====
    await client.query(`
      UPDATE sif_funds SET
        benchmark = 'NIFTY 50 Hybrid Composite Debt 50:50 Index',
        objective = 'The primary objective of the investment strategy is to generate capital appreciation through equity and equity related instruments and income through arbitrage, derivatives strategies, special situations and fixed income investments.',
        fund_type = 'interval',
        subscription_frequency = 'Daily',
        redemption_terms = 'Twice a week (Monday and Wednesday)',
        plans_and_options = 'Direct, Regular / Growth, IDCW',
        exit_load = '0.50% of applicable NAV if redeemed/switched within 90 days from allotment. NIL after 90 days.',
        features = 'Lumpsum, SIP, SWP, STP',
        min_sip_amount = 'SIP/STP/SWP: Rs 1,000 and in multiples of Re 1 thereafter (subject to min investment of Rs 10 lakh)',
        sip_options = $1,
        risk_band = 1,
        benchmark_risk_band = 3,
        tagline = 'An income-oriented solution',
        investment_approach = 'Core Strategy: Arbitrage (Cash-Future, 20-40%) aiming to capture low-risk returns + Fixed Income (40-60%) investing in quality debt instruments for accrual and potential price appreciation. Enhanced Drivers: Special Situations (0-10%) including IPO, Open Offer, Buyback, Merger/Demerger, QIP, Index inclusion/exclusion + Derivative Strategies (10-20%) including Long-Short equities, Straddle, Strangle, Put-call Parity.',
        indicative_allocation = $2,
        taxation = $3,
        why_invest = $4,
        derivative_strategies = $5,
        alpha_strategies = $6,
        risk_management = 'Derivative strategies: Large cap stocks <3% single stock limit, Mid cap stocks <2%, Total stocks >20, Sector limits <10% per sector for non-Nifty50 stocks, +/-7.5% Nifty50 exposure. Special situations: F&O stock position limit up to 10%, Non-F&O up to 5%. Pair trades: Sector/Theme neutral, Granular portfolio, Same exposure limits as derivatives. Risk mitigation during market sensitive events via delta hedging/arbitrage. Stop Loss: 5% at strategy level.',
        fund_manager_details = $7,
        back_tested_performance = $8,
        portfolio_strategy_detail = $9,
        website_url = 'https://www.edelweissmf.com/altiva-sif'
      WHERE slug = 'edelweiss-altiva'
    `, [
      JSON.stringify({ sip: "1000", stp: "1000", swp: "1000" }),
      JSON.stringify({ equity: 50, debt: 35, derivatives: 15 }),
      JSON.stringify({ stcg: "As per tax slab on investments held for up to 12 months (equity) / 24 months (debt)", ltcg: "12.5% on investments held for more than 12 months (equity) / as per slab (debt)" }),
      JSON.stringify([
        "Aims for Consistent Income with Low Volatility - Core allocation to arbitrage and fixed income ensures stable returns, while special situations and derivatives offer moderate equity growth",
        "All-Weather Strategy - Combination of multiple strategies aims for smoother outcomes regardless of overall market direction in the medium term",
        "Tax Efficiency - Long-term capital gains taxed at 12.5% (over 2 year period), making post-tax returns highly competitive vs Cat III AIFs",
        "Robust Risk Management - Active management and strict strategy-level risk controls help reduce portfolio volatility and provide downside protection",
        "Experienced Investment Team - Managed by a highly specialized team with experience across derivatives and special situations strategies"
      ]),
      JSON.stringify(["Covered Call", "Short Straddle", "Short Strangle", "Pair Trades"]),
      JSON.stringify([
        "Special Situations: IPO participation (main board, min size Rs 1,000 cr) - contributed 2.3-3.5% return over last 3 years",
        "Open Offer / Buyback participation with risk mitigation for lower acceptance ratios",
        "QIP (Qualified Institutional Placement) - buying discounted institutional shares",
        "Merger/Demerger spread trades",
        "Index Inclusion/Exclusion trades"
      ]),
      JSON.stringify([
        { name: "Bhavesh Jain", designation: "Co-Head, Factor Investing & Fund Manager", experience: "16+ years in financial markets", bio: "Started in the Low Risk Trading team at Edelweiss. Now Fund Manager managing several funds in Risk Adjusted Returns Strategies in addition to ETFs." },
        { name: "Bharat Lahoti", designation: "Co-Head, Factor Investing & Fund Manager", experience: "18 years in portfolio management, macro and sector research", bio: "Previously worked with marquee investment banks and asset management companies. Last assignment was with a global hedge fund as senior manager working on fundamental and quantitative research ideas." },
        { name: "Dhawal Dalal", designation: "Chief Investment Officer (CIO), Fixed Income", experience: "28 years in fixed income", bio: "Responsible for overall growth of fixed income assets through a healthy mix of retail and institutional clients. MBA from University of Dallas (USA)." },
        { name: "Pranavi Kulkarni", designation: "Fund Manager & Credit Analyst", experience: "Fixed income specialist", bio: "Manages debt allocation and credit analysis for the fund." },
        { name: "Amit Vora", designation: "Head, Dealing & Fund Manager (Overseas)", experience: "Overseas investment specialist", bio: "Manages overseas allocation and dealing operations for the fund." }
      ]),
      JSON.stringify({
        summary: "Back-tested strategy outperformed arbitrage strategy. 2Y rolling return: avg 10.10% vs 7.00% for arbitrage. Strategy returned 179 (rebased to 100) vs 150 for arbitrage over the period.",
        rolling_2y: { strategy_avg: "10.10%", arbitrage_avg: "7.00%", strategy_max: "12.89%", arbitrage_max: "8.73%", strategy_min: "6.60%", arbitrage_min: "4.50%" },
        rolling_returns: [
          { period: "1M", min: "-3.03%", max: "5.42%", avg: "0.79%" },
          { period: "3M", min: "-2.83%", max: "4.93%", avg: "2.44%" },
          { period: "6M", min: "0.07%", max: "9.01%", avg: "4.19%" },
          { period: "1Y", min: "2.77%", max: "10.33%", avg: "7.00%" },
          { period: "2Y", min: "6.60%", max: "12.89%", avg: "10.10%" }
        ]
      }),
      JSON.stringify({
        core: {
          arbitrage: { range: "20-40%", description: "Cash-Future arbitrage strategies aiming to capture low-risk returns" },
          fixed_income: { range: "40-60%", description: "Quality debt instruments for accrual and potential price appreciation. BFSI sector ~20% up to 5Y maturity, Non-BFSI ~10% up to 5Y, AAA CPSE for liquidity." }
        },
        enhanced: {
          special_situations: { range: "0-10%", description: "IPO, Open Offer, Buyback, Merger/Demerger, QIP, Index inclusion/exclusion" },
          derivative_strategies: { range: "10-20%", description: "Long-Short equities, Straddle, Strangle, Put-call Parity, Covered Call, Pair Trades" }
        }
      })
    ]);
    console.log("  -> Altiva Hybrid Long-Short updated");

    await client.query("COMMIT");
    console.log("\nAll 4 funds updated with presentation data!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seed failed:", err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seedPresentationData().catch((err) => {
  console.error(err);
  process.exit(1);
});
