import { ElementorTemplateItem } from '../types';

export const ELEMENTOR_TEMPLATES: ElementorTemplateItem[] = [
  {
    id: 'single-video-template',
    title: 'Single Video Template (Theme Builder)',
    type: 'single',
    category: 'Single Post (CPT: Videos)',
    description: 'Dynamic single post template with responsive video embed container (Vimeo custom field), video title, tax terms, duration chip, paywall conditional logic, WooCommerce Buy Now button, and related videos grid.',
    jsonFileName: 'wildearth-single-video-elementor-template.json',
    jsonContent: {
      version: '0.4',
      title: 'WildEarth – Single Video Document',
      type: 'single-post',
      conditions: ['include/singular/video'],
      content: [
        {
          id: 'con-video-hero',
          elType: 'container',
          isInner: false,
          settings: {
            content_width: 'boxed',
            container_type: 'flex',
            flex_direction: 'column',
            background_background: 'classic',
            background_color: '#070d0a',
            padding: { top: '30', bottom: '30', left: '20', right: '20', unit: 'px' },
          },
          elements: [
            {
              id: 'widget-video-player',
              elType: 'widget',
              widgetType: 'video',
              settings: {
                video_type: 'vimeo',
                vimeo_url: '[custom_field key="video_vimeo_id"]',
                aspect_ratio: '169',
                controls: 'yes',
                color: '#10b981',
                show_title: 'no',
                byline: 'no',
              },
            },
            {
              id: 'widget-post-title',
              elType: 'widget',
              widgetType: 'theme-post-title',
              settings: {
                title_tag: 'h1',
                typography_typography: 'custom',
                typography_font_family: 'Montserrat',
                typography_font_size: { unit: 'px', size: 36 },
                typography_font_weight: '700',
                title_color: '#ffffff',
              },
            },
            {
              id: 'widget-post-info',
              elType: 'widget',
              widgetType: 'post-info',
              settings: {
                type: 'inline',
                items: [
                  { type: 'terms', taxonomy: 'video_category', text: 'Category: ' },
                  { type: 'custom', text: '[custom_field key="video_duration"]' },
                  { type: 'date', text: 'Released: ' },
                ],
              },
            },
            {
              id: 'widget-paywall-checkout',
              elType: 'widget',
              widgetType: 'woocommerce-product-add-to-cart',
              settings: {
                product_id: '[custom_field key="linked_woocommerce_product_id"]',
                button_text: 'Buy Documentary Access',
              },
            },
            {
              id: 'widget-post-content',
              elType: 'widget',
              widgetType: 'theme-post-content',
              settings: {},
            },
            {
              id: 'widget-related-videos',
              elType: 'widget',
              widgetType: 'posts',
              settings: {
                posts_per_page: 4,
                columns: 4,
                query_post_type: 'video',
                query_include: 'terms',
                query_include_term_ids: ['current_term'],
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'header-template',
    title: 'Global Header Template (Sticky + Responsive)',
    type: 'header',
    category: 'Theme Builder Global Header',
    description: 'Cinematic dark forest navigation bar with brand wordmark, desktop navigation links, live search trigger modal, WooCommerce mini-cart drawer trigger, and login/register button.',
    jsonFileName: 'wildearth-header-elementor-template.json',
    jsonContent: {
      version: '0.4',
      title: 'WildEarth – Global Header',
      type: 'header',
      conditions: ['include/general'],
      content: [
        {
          id: 'con-header-bar',
          elType: 'container',
          isInner: false,
          settings: {
            content_width: 'full',
            container_type: 'flex',
            flex_direction: 'row',
            justify_content: 'space-between',
            align_items: 'center',
            background_background: 'classic',
            background_color: 'rgba(11, 21, 16, 0.95)',
            position: 'sticky',
            sticky: 'top',
            border_bottom: { unit: 'px', size: 1, color: 'rgba(255,255,255,0.08)' },
          },
          elements: [
            {
              id: 'widget-site-logo',
              elType: 'widget',
              widgetType: 'site-logo',
              settings: { link_to: 'custom', link: { url: '/' } },
            },
            {
              id: 'widget-nav-menu',
              elType: 'widget',
              widgetType: 'nav-menu',
              settings: {
                layout: 'horizontal',
                align_items: 'center',
                color_menu_item: '#e8eee9',
                color_menu_item_hover: '#10b981',
              },
            },
            {
              id: 'widget-cta-button',
              elType: 'widget',
              widgetType: 'button',
              settings: {
                text: 'Explore Videos',
                link: { url: '/videos' },
                button_type: 'default',
                background_color: '#10b981',
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'footer-template',
    title: 'Global Footer Template (4-Column Elementor Container)',
    type: 'footer',
    category: 'Theme Builder Global Footer',
    description: 'Four-column container with brand mission statement, video archive links, legal & refund policies, social media icons, and newsletter form widget.',
    jsonFileName: 'wildearth-footer-elementor-template.json',
    jsonContent: {
      version: '0.4',
      title: 'WildEarth – Global Footer',
      type: 'footer',
      conditions: ['include/general'],
      content: [
        {
          id: 'con-footer-main',
          elType: 'container',
          isInner: false,
          settings: {
            content_width: 'boxed',
            container_type: 'flex',
            background_color: '#070d0a',
            padding: { top: '80', bottom: '40', left: '20', right: '20' },
          },
        },
      ],
    },
  },
  {
    id: 'archive-video-template',
    title: 'Video Archive Template (Loop Grid + Filters)',
    type: 'archive',
    category: 'Theme Builder Archive',
    description: 'Dynamic loop grid for CPT Videos with category taxonomy filtering, duration tags, free/premium badges, and responsive pagination.',
    jsonFileName: 'wildearth-archive-videos-elementor-template.json',
    jsonContent: {
      version: '0.4',
      title: 'WildEarth – Video Archive',
      type: 'archive',
      conditions: ['include/archive/video'],
      content: [],
    },
  },
  {
    id: 'homepage-template',
    title: 'Full Cinematic Homepage (All 8 Sections)',
    type: 'page',
    category: 'Page Template',
    description: 'Hero with video background, Featured Stories grid, 4 Visual Category Bento Cards, Latest Videos query, Premium Showcase, Conservation Call-to-Action, and Newsletter.',
    jsonFileName: 'wildearth-homepage-elementor-template.json',
    jsonContent: {
      version: '0.4',
      title: 'WildEarth – Homepage Canvas',
      type: 'page',
      content: [],
    },
  },
  {
    id: 'global-kit-template',
    title: 'Elementor Global Kit & Site Settings',
    type: 'kit',
    category: 'Elementor Site Settings (Kit)',
    description: 'Exact design token mappings: Deep Forest Green (#070D0A, #0B1510), Emerald Accent (#10B981), Natural Earth Sand (#D4C5A9), Montserrat display typography, and Plus Jakarta Sans body font.',
    jsonFileName: 'wildearth-global-style-kit.json',
    jsonContent: {
      version: '0.4',
      title: 'WildEarth Global Kit',
      type: 'kit',
      settings: {
        system_colors: [
          { _id: 'primary', title: 'Deep Forest', color: '#070D0A' },
          { _id: 'secondary', title: 'Forest Surface', color: '#0F1C16' },
          { _id: 'text', title: 'Nature Pale Text', color: '#E8EEE9' },
          { _id: 'accent', title: 'Emerald Green', color: '#10B981' },
          { _id: 'earth_sand', title: 'Natural Sand', color: '#D4C5A9' },
        ],
        system_typography: [
          { _id: 'primary', title: 'Headings (Montserrat)', font_family: 'Montserrat' },
          { _id: 'secondary', title: 'Body (Plus Jakarta Sans)', font_family: 'Plus Jakarta Sans' },
        ],
      },
    },
  },
];

export const WORDPRESS_PHP_SNIPPET = `<?php
/**
 * Plugin Name: WildEarth Cinema Core (CPT & WooCommerce Video Access)
 * Description: Registers the "Videos" Custom Post Type, Vimeo embed fields, and grants automated streaming access upon WooCommerce purchase.
 * Version: 1.0.0
 * Author: WildEarth Conservation Engineering
 */

if (!defined('ABSPATH')) exit;

// 1. Register Custom Post Type: Videos
function wildearth_register_video_cpt() {
    $labels = array(
        'name'               => 'Videos',
        'singular_name'      => 'Video',
        'menu_name'          => 'Wildlife Videos',
        'name_admin_bar'     => 'Video',
        'add_new'            => 'Add New Video',
        'add_new_item'       => 'Add New Wildlife Video',
        'new_item'           => 'New Video',
        'edit_item'          => 'Edit Video',
        'view_item'          => 'View Video',
        'all_items'          => 'All Videos',
        'search_items'       => 'Search Videos',
        'not_found'          => 'No videos found.',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'videos'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-video-alt3',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'elementor'),
        'show_in_rest'       => true,
    );

    register_post_type('video', $args);

    // Register Taxonomies
    register_taxonomy('video_category', 'video', array(
        'hierarchical' => true,
        'labels' => array('name' => 'Video Categories', 'singular_name' => 'Video Category'),
        'show_ui' => true,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'video-category'),
    ));

    register_taxonomy('video_tag', 'video', array(
        'hierarchical' => false,
        'labels' => array('name' => 'Video Tags', 'singular_name' => 'Video Tag'),
        'show_ui' => true,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'video-tag'),
    ));
}
add_action('init', 'wildearth_register_video_cpt');

// 2. Add Meta Boxes for Vimeo Video ID, Pricing & Paywall Settings
function wildearth_add_video_metaboxes() {
    add_meta_box('wildearth_video_details', 'Video Streaming & Paywall Settings', 'wildearth_render_video_metabox', 'video', 'normal', 'high');
}
add_action('add_meta_boxes', 'wildearth_add_video_metaboxes');

function wildearth_render_video_metabox($post) {
    wp_nonce_field('wildearth_save_video_data', 'wildearth_video_nonce');
    $vimeo_id    = get_post_meta($post->ID, '_wildearth_vimeo_id', true);
    $duration    = get_post_meta($post->ID, '_wildearth_duration', true);
    $is_premium  = get_post_meta($post->ID, '_wildearth_is_premium', true);
    $price       = get_post_meta($post->ID, '_wildearth_price', true);
    $woo_prod_id = get_post_meta($post->ID, '_wildearth_linked_product_id', true);
    ?>
    <table class="form-table">
        <tr>
            <th><label for="wildearth_vimeo_id">Vimeo Video ID / URL</label></th>
            <td>
                <input type="text" id="wildearth_vimeo_id" name="wildearth_vimeo_id" value="<?php echo esc_attr($vimeo_id); ?>" class="regular-text" placeholder="e.g. 76979871" />
                <p class="description">Enter your Vimeo Pro video ID. Ensure domain-level privacy is set to your WordPress domain in Vimeo.</p>
            </td>
        </tr>
        <tr>
            <th><label for="wildearth_duration">Duration</label></th>
            <td>
                <input type="text" id="wildearth_duration" name="wildearth_duration" value="<?php echo esc_attr($duration); ?>" class="regular-text" placeholder="e.g. 54 min" />
            </td>
        </tr>
        <tr>
            <th><label for="wildearth_is_premium">Access Model</label></th>
            <td>
                <select id="wildearth_is_premium" name="wildearth_is_premium">
                    <option value="0" <?php selected($is_premium, '0'); ?>>Free to Stream</option>
                    <option value="1" <?php selected($is_premium, '1'); ?>>Premium (Pay-Per-View / Purchase Required)</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="wildearth_price">Price (USD)</label></th>
            <td>
                <input type="number" step="0.01" id="wildearth_price" name="wildearth_price" value="<?php echo esc_attr($price); ?>" class="small-text" placeholder="8.99" />
                <p class="description">Used for WooCommerce product synchronization.</p>
            </td>
        </tr>
        <tr>
            <th><label for="wildearth_linked_product_id">Linked WooCommerce Product ID</label></th>
            <td>
                <input type="number" id="wildearth_linked_product_id" name="wildearth_linked_product_id" value="<?php echo esc_attr($woo_prod_id); ?>" class="small-text" />
                <p class="description">Optional: Select existing product or let the plugin auto-generate a Virtual WooCommerce Product on publish.</p>
            </td>
        </tr>
    </table>
    <?php
}

function wildearth_save_video_data($post_id) {
    if (!isset($_POST['wildearth_video_nonce']) || !wp_verify_nonce($_POST['wildearth_video_nonce'], 'wildearth_save_video_data')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    if (isset($_POST['wildearth_vimeo_id'])) update_post_meta($post_id, '_wildearth_vimeo_id', sanitize_text_field($_POST['wildearth_vimeo_id']));
    if (isset($_POST['wildearth_duration'])) update_post_meta($post_id, '_wildearth_duration', sanitize_text_field($_POST['wildearth_duration']));
    if (isset($_POST['wildearth_is_premium'])) update_post_meta($post_id, '_wildearth_is_premium', sanitize_text_field($_POST['wildearth_is_premium']));
    if (isset($_POST['wildearth_price'])) update_post_meta($post_id, '_wildearth_price', sanitize_text_field($_POST['wildearth_price']));
}
add_action('save_post_video', 'wildearth_save_video_data');

// 3. User Access Verification: Can User Watch Video?
function wildearth_user_can_watch($video_id, $user_id = null) {
    $is_premium = get_post_meta($video_id, '_wildearth_is_premium', true);
    if ($is_premium !== '1') return true; // Free video

    if (!$user_id) $user_id = get_current_user_id();
    if (!$user_id) return false;

    // Check if user is administrator
    if (user_can($user_id, 'manage_options')) return true;

    // Check if user purchased the linked WooCommerce product
    $product_id = get_post_meta($video_id, '_wildearth_linked_product_id', true);
    if ($product_id && function_exists('wc_customer_bought_product')) {
        return wc_customer_bought_product('', $user_id, $product_id);
    }

    // Check user meta library array
    $unlocked_videos = get_user_meta($user_id, '_wildearth_unlocked_videos', true);
    if (is_array($unlocked_videos) && in_array($video_id, $unlocked_videos)) {
        return true;
    }

    return false;
}

// 4. WooCommerce Order Completed Hook -> Automatically Unlock Video
add_action('woocommerce_order_status_completed', 'wildearth_grant_video_access_on_order');
function wildearth_grant_video_access_on_order($order_id) {
    $order = wc_get_order($order_id);
    $user_id = $order->get_user_id();
    if (!$user_id) return;

    $unlocked = get_user_meta($user_id, '_wildearth_unlocked_videos', true) ?: array();

    foreach ($order->get_items() as $item) {
        $product_id = $item->get_product_id();
        $video_id = get_post_meta($product_id, '_wildearth_associated_video_id', true);
        if ($video_id && !in_array($video_id, $unlocked)) {
            $unlocked[] = $video_id;
        }
    }
    update_user_meta($user_id, '_wildearth_unlocked_videos', $unlocked);
}
`;
