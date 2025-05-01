
import PageHeader from "@/components/ui/PageHeader";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <PageHeader
        title="About Agent4u"
        description="Discover AI & SaaS deals without barriers"
      />
      
      <div className="bg-white shadow-sm rounded-xl border p-8 mb-12">
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Agent4u was created to help entrepreneurs, students, and creators save money while exploring the best AI and SaaS tools. Our mission is to surface all the free trials, referral rewards, and discounts out there – without making you jump through hoops.
            </p>
            <p className="text-gray-700 mt-4">
              Unlike other deal sites, we don't hide offers behind paywalls or memberships. Every deal you see here is publicly accessible – no signup required to browse.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700">
              We noticed many startup deal websites required logins or paid memberships to view deals. Agent4u is our answer – inspired by those platforms' content, but dropping the barriers. We believe if a deal is out there, you should be able to get it easily.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Curated list of top AI & SaaS tools across various domains</li>
              <li>Detailed breakdown of free trials and bonuses for each tool</li>
              <li>Guides on integrating tools with automation (n8n workflows) to maximize their value</li>
              <li>Regular updates as new deals or tools emerge</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
