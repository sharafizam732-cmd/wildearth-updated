import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  Code,
  BookOpen,
  Layers,
  Settings,
  ShieldCheck,
  Video,
  DollarSign,
  Palette,
  ExternalLink,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { ELEMENTOR_TEMPLATES, WORDPRESS_PHP_SNIPPET } from '../data/elementorTemplates';

export const ElementorKitHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'guides' | 'php'>('templates');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [activeGuide, setActiveGuide] = useState<string>('guide-import');

  const copyToClipboard = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIndex(id);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const downloadJson = (fileName: string, jsonContent: object) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(jsonContent, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', fileName);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const guides = [
    {
      id: 'guide-import',
      title: '1. Importing & Assigning Elementor Pro Templates',
      icon: Layers,
      content: `
### Step 1: Install Required Plugins
1. In your WordPress Dashboard, ensure you have installed and activated:
   * **Elementor** (Free from WordPress.org)
   * **Elementor Pro** (Theme Builder is required for Single Post & Archive templates)
   * **WooCommerce** (For Pay-Per-View video commerce)
   * **Advanced Custom Fields (ACF)** or our included CPT snippet.

### Step 2: Import the JSON Template Files
1. Navigate to **Templates → Saved Templates → Import Templates**.
2. Click **Choose File** and upload each downloaded \`.json\` template from the **Templates** tab:
   * \`wildearth-header-elementor-template.json\` (Header)
   * \`wildearth-footer-elementor-template.json\` (Footer)
   * \`wildearth-single-video-elementor-template.json\` (Single Video)
   * \`wildearth-archive-videos-elementor-template.json\` (Archive)
   * \`wildearth-global-style-kit.json\` (Site Settings)

### Step 3: Configure Theme Builder Display Conditions
1. Go to **Templates → Theme Builder**.
2. Hover over **Header** → Click **Edit Conditions** → Set to: \`Include: Entire Site\`.
3. Hover over **Footer** → Click **Edit Conditions** → Set to: \`Include: Entire Site\`.
4. Hover over **Single Post** → Click **Edit Conditions** → Set to: \`Include: Videos (Singular)\`.
5. Hover over **Archive** → Click **Edit Conditions** → Set to: \`Include: Videos Archive\` and \`Video Categories\`.
      `,
    },
    {
      id: 'guide-vimeo',
      title: '2. Connecting Vimeo Pro with Domain-Level Security',
      icon: Video,
      content: `
### Why Vimeo Pro / OTT for Wildlife Streaming?
Wildlife 4K footage files are huge (1GB to 8GB+). Storing them directly on WordPress will slow down your server and exhaust storage. Vimeo provides global CDN transcoding, adaptive bitrate streaming, and secure token protection.

### Step 1: Vimeo Privacy Settings
1. In your Vimeo account, upload your wildlife documentary.
2. Under **Video Settings → Privacy**:
   * Set **Who can watch?** to **"Hide from Vimeo"** (Unlisted).
   * Set **Where can this be embedded?** to **"Specific domains"**.
   * Add your exact WordPress website domain (e.g., \`https://yourwildlifesite.com\`).
   * This prevents unauthorized visitors from copying the video URL or embedding it on external websites!

### Step 2: Grab the Vimeo Video ID
1. Each video on Vimeo has a numeric ID in the URL (e.g. \`https://vimeo.com/76979871\` → ID is \`76979871\`).
2. When creating or editing a Video in WordPress (under **Wildlife Videos → Add New**), paste this ID into the **Vimeo Video ID** custom field.
3. The Elementor Single Video template will automatically render the protected player with custom controls and brand colors!
      `,
    },
    {
      id: 'guide-woocommerce',
      title: '3. Setting Up WooCommerce & Paywall Access Control',
      icon: DollarSign,
      content: `
### Step 1: Enable Virtual / Downloadable Products
1. In WordPress, go to **WooCommerce → Settings → Products**.
2. Individual wildlife documentaries are sold as **Virtual Products** (no shipping required).
3. Under **WooCommerce → Settings → Accounts & Privacy**:
   * Check *"Allow customers to create an account during checkout"*.
   * Check *"Allow customers to log into an existing account during checkout"*.

### Step 2: Automatic Product Creation via CPT Hook
1. When you add a Video with **Access Model: Premium** and enter a Price (e.g. \`$8.99\`), our included PHP plugin automatically provisions a linked WooCommerce Virtual Product.
2. Upon customer checkout completion via Stripe, PayPal, or Apple Pay:
   * The hook \`woocommerce_order_status_completed\` fires.
   * The video ID is recorded in the customer's \`_wildearth_unlocked_videos\` meta.
   * Access is instantly granted, and the film appears immediately in the customer's **My Library** dashboard!
      `,
    },
    {
      id: 'guide-add-videos',
      title: '4. Adding & Managing Videos Without Touching Code',
      icon: BookOpen,
      content: `
### Content Management Workflow
1. Go to **Wildlife Videos → Add New Video** in your WordPress admin sidebar.
2. Enter the **Documentary Title** and **Full Synopsis / Description**.
3. In the right sidebar:
   * Select or add a **Video Category** (*Wildlife*, *Nature*, *Conservation*, or *AI & Wildlife*).
   * Add relevant **Video Tags** (*Lions*, *4K*, *Acoustics*, *Endangered*).
   * Set the **Featured Image** (high-resolution documentary thumbnail).
4. In the **Video Streaming & Paywall Settings** box below the editor:
   * Enter your **Vimeo Video ID** (e.g. \`76979871\`).
   * Enter **Duration** (e.g. \`54 min\`).
   * Choose **Access Model**: Select *Free to Stream* or *Premium*.
   * Enter **Price (USD)** if premium.
5. Click **Publish**. Your video is instantly live in the archive, category pages, and homepage feeds!
      `,
    },
    {
      id: 'guide-prices',
      title: '5. Changing Prices & Access Tiers',
      icon: DollarSign,
      content: `
### How to Modify Pricing Anytime:
1. Go to **Wildlife Videos → All Videos**.
2. Click on the video you want to edit.
3. Scroll down to the **Video Streaming & Paywall Settings** meta box.
4. Update the **Price (USD)** field to your new amount (e.g. change from \`8.99\` to \`5.99\` for a limited sale).
5. If you want to make a previously premium video free for promotional outreach:
   * Switch **Access Model** from *Premium* to *Free to Stream*.
   * Click **Update**.
6. Elementor dynamic price tags, cards, and WooCommerce cart values will immediately reflect the new price.
      `,
    },
    {
      id: 'guide-styles',
      title: '6. Customizing Colors, Typography & Brand Logo',
      icon: Palette,
      content: `
### Editing Global Styles via Elementor Site Settings:
1. Open any page in the **Elementor Editor**.
2. Click the **Hamburger Menu (≡)** in the top-left corner of the Elementor panel.
3. Select **Site Settings**:
   * **Global Colors**:
     - *Primary*: Change Deep Forest Green (\`#070D0A\`).
     - *Secondary*: Change Forest Surface (\`#0F1C16\`).
     - *Accent*: Change Emerald Green (\`#10B981\`).
     - *Earth Sand*: Change Natural Beige (\`#D4C5A9\`).
   * **Global Fonts**:
     - *Primary (Headings)*: Defaults to **Montserrat** (bold, cinematic). You can switch to *Poppins*, *Cinzel*, or *Clash Display*.
     - *Secondary (Body)*: Defaults to **Plus Jakarta Sans** (clean, accessible).
   * **Site Identity**:
     - Upload your custom Wildlife Conservation Logo (SVG or PNG with transparent background) and Favicon.
4. Click **Update**. Changes cascade instantaneously across all headers, cards, footers, and templates!
      `,
    },
  ];

  return (
    <div className="min-h-screen py-10 bg-[#070d0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Hub Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WordPress & Elementor Pro Deliverable Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Montserrat']">
            Elementor Pro Template Pack & Guides
          </h1>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Download valid Elementor Theme Builder JSON files, install the Custom Post Type plugin snippet, and follow step-by-step guides for Vimeo and WooCommerce setup.
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'templates'
                  ? 'bg-emerald-500 text-[#070d0a] shadow-lg'
                  : 'bg-[#0b1510] text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Elementor Templates ({ELEMENTOR_TEMPLATES.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'guides'
                  ? 'bg-emerald-500 text-[#070d0a] shadow-lg'
                  : 'bg-[#0b1510] text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Setup & Integration Guides</span>
            </button>
            <button
              onClick={() => setActiveTab('php')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'php'
                  ? 'bg-emerald-500 text-[#070d0a] shadow-lg'
                  : 'bg-[#0b1510] text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>WordPress CPT Plugin Code</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Elementor JSON Templates */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ELEMENTOR_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="bg-[#0b1510] border border-[#2d5a47]/60 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all shadow-xl"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {tmpl.category}
                    </span>
                    <h3 className="text-base font-bold text-white font-['Montserrat'] mt-2">
                      {tmpl.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {tmpl.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <div className="text-[11px] text-neutral-500 font-mono truncate">
                      File: {tmpl.jsonFileName}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => downloadJson(tmpl.jsonFileName, tmpl.jsonContent)}
                        className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download JSON</span>
                      </button>

                      <button
                        onClick={() =>
                          copyToClipboard(JSON.stringify(tmpl.jsonContent, null, 2), tmpl.id)
                        }
                        className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                      >
                        {copiedIndex === tmpl.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy JSON</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Setup & Integration Guides */}
        {activeTab === 'guides' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              {guides.map((g) => {
                const Icon = g.icon;
                const isSelected = activeGuide === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setActiveGuide(g.id)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs font-bold transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-lg'
                        : 'bg-[#0b1510] border-white/5 text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{g.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-2 bg-[#0b1510] border border-[#2d5a47]/50 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              {guides
                .filter((g) => g.id === activeGuide)
                .map((g) => (
                  <div key={g.id} className="prose prose-invert max-w-none text-xs leading-relaxed space-y-4">
                    <h2 className="text-xl font-bold text-white font-['Montserrat'] pb-2 border-b border-white/10">
                      {g.title}
                    </h2>
                    <div className="text-neutral-300 space-y-4 whitespace-pre-line font-sans">
                      {g.content}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 3: WordPress PHP Snippet */}
        {activeTab === 'php' && (
          <div className="bg-[#0b1510] border border-[#2d5a47]/50 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white font-['Montserrat']">
                  WordPress Custom Post Type & Paywall Core Plugin
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Place this snippet into your child theme's <code className="text-emerald-400 font-mono">functions.php</code> or create a custom plugin inside <code className="text-emerald-400 font-mono">wp-content/plugins/wildearth-core.php</code>.
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(WORDPRESS_PHP_SNIPPET, 'php-snippet')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all self-start sm:self-auto"
              >
                {copiedIndex === 'php-snippet' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied Code!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy PHP Code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-[#050907] border border-white/10 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-[500px] leading-relaxed">
              <code>{WORDPRESS_PHP_SNIPPET}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
