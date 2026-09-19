--- a/src/lib/products.ts  
+++ b/src/lib/products.ts  
@@ -145,10 +145,6 @@ const LOOP_PRODUCT_SKUS = new Set<string>([  
   'LP-10-CMP',  
-  'SNSL1',  
-  'SNSL4',  
-  'SNSL8',  
-  'SNWL2',  
-  'SNWL4',  
-  'SNWL8',  
-  'SNWL16',  
   'IDMLL02',  
   'IDMLL08',  
   'SPSNK2PS',  
@@ -373,250 +369,6 @@ export const PRODUCTS: Product[] = [  
     sku: 'LOV0142',  
     stock: 48,  
   },  
-  {  
-    id: 'c-58',  
-    slug: 'swiss-navy-silicone-lube-1-oz',  
-    category: 'blue-dark-anal',  
-    name: 'Swiss Navy Silicone Lube 1 oz',  
-    tagline: 'Compact bottle. Silky silicone glide.',  
-    material: 'Silicone-based lubricant',  
-    image: '/images/products/SNSL1-swiss-navy-silicone-lube-1oz.jpg',  
-    description:  
-      'A silky silicone formula in a compact 1 fl oz bottle, sized for travel or a bedside kit.',  
-    specs: [  
-      '1 fl oz',  
-      'Silicone-based formula',  
-      'SKU: SNSL1',  
-      'UPC: 699439004149',  
-    ],  
-    price: 12.99,  
-    sku: 'SNSL1',  
-    stock: 134,  
-  },  
-  {  
-    id: 'c-59',  
-    slug: 'swiss-navy-silicone-lube-4-oz',  
-    category: 'blue-dark-anal',  
-    name: 'Swiss Navy Silicone Lube 4 oz',  
-    tagline: 'Everyday size. Smooth silicone glide.',  
-    material: 'Silicone-based lubricant',  
-    image: '/images/products/SNSL4-swiss-navy-silicone-lube-4oz.jpg',  
-    description:  
-      'A smooth silicone formula with a low-drag feel in a practical 4 fl oz bottle.',  
-    specs: [  
-      '4 fl oz',  
-      'Silicone-based formula',  
-      'SKU: SNSL4',  
-      'UPC: 699439009021',  
-    ],  
-    price: 34.99,  
-    sku: 'SNSL4',  
-    stock: 23,  
-  },  
-  {  
-    id: 'c-60',  
-    slug: 'swiss-navy-silicone-lube-8-oz',  
-    category: 'blue-dark-anal',  
-    name: 'Swiss Navy Silicone Lube 8 oz',  
-    tagline: 'More volume. Silky silicone glide.',  
-    material: 'Silicone-based lubricant',  
-    image: '/images/products/SNSL8-swiss-navy-silicone-lube-8oz.jpg',  
-    description:  
-      'A silky silicone formula with an easy-flowing feel in an 8 fl oz bottle.',  
-    specs: [  
-      '8 fl oz',  
-      'Silicone-based formula',  
-      'SKU: SNSL8',  
-      'UPC: 699439009038',  
-    ],  
-    price: 54.99,  
-    sku: 'SNSL8',  
-    stock: 101,  
-  },  
-  {  
-    id: 'c-61',  
-    slug: 'swiss-navy-water-based-lube-2-oz',  
-    category: 'blue-dark-anal',  
-    name: 'Swiss Navy Water Based Lube 2 oz',  
-    tagline: 'Compact bottle. Light water-based glide.',  
-    material: 'Water-based lubricant',  
-    image: '/images/products/SNWL2-swiss-navy-water-based-lube-2oz.jpg',  
-    description:  
-      'A smooth water-based formula in a compact 2 fl oz bottle for a light, straightforward glide.',  
-    specs: [  
-      '2 fl oz',  
-      'Water-based formula',  
-      'SKU: SNWL2',  
-      'UPC: 699439009106',  
-    ],  
-    price: 12.99,  
-    sku: 'SNWL2',  
-    stock: 471,  
-  },  
-  {  
-    id: 'c-62',  
-    slug: 'swiss-navy-water-based-lube-4-oz',  
-    category: 'blue-dark-anal',  
-    name: 'Swiss Navy Water Based Lube 4 oz',  
-    tagline: 'Smooth glide in a versatile 4 oz size.',  
-    material: 'Water-based lubricant',  
-    image: '/images/products/SNWL4-swiss-navy-water-based-lube-4oz.jpg',  
-    description:  
-      'A smooth water-based formula with a light feel in a versatile 4 fl oz bottle.',  
-    specs: [  
-      '4 fl oz',  
-      'Water-based formula',  
-      'SKU: SNWL4',  
-      'UPC: 699439009113',  
-    ],  
-    price: 19.99,  
-    sku: 'SNWL4',  
-    stock: 279,  
-  },  
-  {  
-    id: 'c-63',  
-    slug: 'swiss-navy-water-based-lube-8-oz',  
-    category: 'blue-dark-anal',  
-    name: 'Swiss Navy Water Based Lube 8 oz',  
-    tagline: 'Light feel. More water-based glide on hand.',  
-    material: 'Water-based lubricant',  
-    image: '/images/products/SNWL8-swiss-navy-water-based-lube-8oz.jpg',  
-    description:  
-      'A light, smooth water-based formula in an 8 fl oz bottle for a larger ready-to-use supply.',  
-    specs: [  
-      '8 fl oz',  
-      'Water-based formula',  
-      'SKU: SNWL8',  
-      'UPC: 699439009120',  
-    ],  
-    price: 27.99,  
-    sku: 'SNWL8',  
-    stock: 154,  
-  },  
-  {  
-    id: 'c-64',  
-    slug: 'swiss-navy-water-based-lube-16-oz',  
-    category: 'blue-dark-anal',  
-    name: 'Swiss Navy Water Based Lube 16 oz',  
-    tagline: 'Smooth water-based glide in a generous size.',  
-    material: 'Water-based lubricant',  
-    image: '/images/products/SNWL16-swiss-navy-water-based-lube-16oz.jpg',  
-    description:  
-      'A smooth water-based formula in a generous 16 fl oz bottle for keeping more glide within reach.',  
-    specs: [  
-      '16 fl oz',  
-      'Water-based formula',  
-      'SKU: SNWL16',  
-      'UPC: 699439009137',  
-    ],  
-    price: 44.99,  
-    sku: 'SNWL16',  
-    stock: 27,  
-  },  
-  {  
-    id: 'c-65',  
-    slug: 'swiss-navy-silicone-based-lube-1-gal',  
-    category: 'blue-dark-anal',  
-    name: 'Swiss Navy Silicone Based Lube 1 Gal',  
-    tagline: 'Silky silicone glide in a full-gallon format.',  
-    material: 'Silicone-based lubricant',  
-    image: '/images/products/SNSL1G-swiss-navy-silicone-based-lube-1gal.jpeg',  
-    description:  
-      'A smooth silicone-based formula in a 1 gal jug for keeping a high-volume supply on hand.',  
-    specs: [  
-      '1 gal',  
-      'Silicone-based formula',  
-      'SKU: SNSL1G',  
-      'UPC: 699439004231',  
-    ],  
-    price: 399.99,  
-    sku: 'SNSL1G',  
-    stock: 14,  
-  },  
-  {  
-    id: 'c-66',  
-    slug: 'swiss-navy-water-based-lube-1-gal',  
-    category: 'blue-dark-anal',  
-    name: 'Swiss Navy Water Based Lube 1 Gal',  
-    tagline: 'Smooth water-based glide in a full-gallon format.',  
-    material: 'Water-based lubricant',  
-    image: '/images/products/SNWB1G-swiss-navy-water-based-lube-1gal.jpeg',  
-    description:  
-      'A smooth water-based formula in a 1 gal jug for keeping a high-volume supply on hand.',  
-    specs: [  
-      '1 gal',  
-      'Water-based formula',  
-      'SKU: SNWB1G',  
-      'UPC: 699439004224',  
-    ],  
-    price: 209.99,  
-    sku: 'SNWB1G',  
-    stock: 8,  
-  },  
   {  
     id: 'c-67',  
     slug: 'id-glide-1oz',  
@@ -1085,7 +837,10 @@  
-// Pulled from public sale by founder decision on 2026-09-07. These records  
+// Pulled from public sale by founder decision on 2026-09-07.  
+// Swiss Navy line withdrawn 2026-09-19: no executed online-seller agreement  
+// and no signed MAP agreement with the brand.  
+//  
+// These records  
 // remain available for historical reference only and must not be rendered,  
 // routed, indexed, or included in catalog validation.  
 export const WITHDRAWN_PRODUCTS: Product[] = [  
@@ -1155,6 +910,248 @@ export const WITHDRAWN_PRODUCTS: Product[] = [  
     price: 52.31,  
     sku: 'DJ5079-03',  
     stock: 12,  
   },  
+  {  
+    id: 'c-58',  
+    slug: 'swiss-navy-silicone-lube-1-oz',  
+    category: 'blue-dark-anal',  
+    name: 'Swiss Navy Silicone Lube 1 oz',  
+    tagline: 'Compact bottle. Silky silicone glide.',  
+    material: 'Silicone-based lubricant',  
+    image: '/images/products/SNSL1-swiss-navy-silicone-lube-1oz.jpg',  
+    description:  
+      'A silky silicone formula in a compact 1 fl oz bottle, sized for travel or a bedside kit.',  
+    specs: [  
+      '1 fl oz',  
+      'Silicone-based formula',  
+      'SKU: SNSL1',  
+      'UPC: 699439004149',  
+    ],  
+    price: 12.99,  
+    sku: 'SNSL1',  
+    stock: 134,  
+  },  
+  {  
+    id: 'c-59',  
+    slug: 'swiss-navy-silicone-lube-4-oz',  
+    category: 'blue-dark-anal',  
+    name: 'Swiss Navy Silicone Lube 4 oz',  
+    tagline: 'Everyday size. Smooth silicone glide.',  
+    material: 'Silicone-based lubricant',  
+    image: '/images/products/SNSL4-swiss-navy-silicone-lube-4oz.jpg',  
+    description:  
+      'A smooth silicone formula with a low-drag feel in a practical 4 fl oz bottle.',  
+    specs: [  
+      '4 fl oz',  
+      'Silicone-based formula',  
+      'SKU: SNSL4',  
+      'UPC: 699439009021',  
+    ],  
+    price: 34.99,  
+    sku: 'SNSL4',  
+    stock: 23,  
+  },  
+  {  
+    id: 'c-60',  
+    slug: 'swiss-navy-silicone-lube-8-oz',  
+    category: 'blue-dark-anal',  
+    name: 'Swiss Navy Silicone Lube 8 oz',  
+    tagline: 'More volume. Silky silicone glide.',  
+    material: 'Silicone-based lubricant',  
+    image: '/images/products/SNSL8-swiss-navy-silicone-lube-8oz.jpg',  
+    description:  
+      'A silky silicone formula with an easy-flowing feel in an 8 fl oz bottle.',  
+    specs: [  
+      '8 fl oz',  
+      'Silicone-based formula',  
+      'SKU: SNSL8',  
+      'UPC: 699439009038',  
+    ],  
+    price: 54.99,  
+    sku: 'SNSL8',  
+    stock: 101,  
+  },  
+  {  
+    id: 'c-61',  
+    slug: 'swiss-navy-water-based-lube-2-oz',  
+    category: 'blue-dark-anal',  
+    name: 'Swiss Navy Water Based Lube 2 oz',  
+    tagline: 'Compact bottle. Light water-based glide.',  
+    material: 'Water-based lubricant',  
+    image: '/images/products/SNWL2-swiss-navy-water-based-lube-2oz.jpg',  
+    description:  
+      'A smooth water-based formula in a compact 2 fl oz bottle for a light, straightforward glide.',  
+    specs: [  
+      '2 fl oz',  
+      'Water-based formula',  
+      'SKU: SNWL2',  
+      'UPC: 699439009106',  
+    ],  
+    price: 12.99,  
+    sku: 'SNWL2',  
+    stock: 471,  
+  },  
+  {  
+    id: 'c-62',  
+    slug: 'swiss-navy-water-based-lube-4-oz',  
+    category: 'blue-dark-anal',  
+    name: 'Swiss Navy Water Based Lube 4 oz',  
+    tagline: 'Smooth glide in a versatile 4 oz size.',  
+    material: 'Water-based lubricant',  
+    image: '/images/products/SNWL4-swiss-navy-water-based-lube-4oz.jpg',  
+    description:  
+      'A smooth water-based formula with a light feel in a versatile 4 fl oz bottle.',  
+    specs: [  
+      '4 fl oz',  
+      'Water-based formula',  
+      'SKU: SNWL4',  
+      'UPC: 699439009113',  
+    ],  
+    price: 19.99,  
+    sku: 'SNWL4',  
+    stock: 279,  
+  },  
+  {  
+    id: 'c-63',  
+    slug: 'swiss-navy-water-based-lube-8-oz',  
+    category: 'blue-dark-anal',  
+    name: 'Swiss Navy Water Based Lube 8 oz',  
+    tagline: 'Light feel. More water-based glide on hand.',  
+    material: 'Water-based lubricant',  
+    image: '/images/products/SNWL8-swiss-navy-water-based-lube-8oz.jpg',  
+    description:  
+      'A light, smooth water-based formula in an 8 fl oz bottle for a larger ready-to-use supply.',  
+    specs: [  
+      '8 fl oz',  
+      'Water-based formula',  
+      'SKU: SNWL8',  
+      'UPC: 699439009120',  
+    ],  
+    price: 27.99,  
+    sku: 'SNWL8',  
+    stock: 154,  
+  },  
+  {  
+    id: 'c-64',  
+    slug: 'swiss-navy-water-based-lube-16-oz',  
+    category: 'blue-dark-anal',  
+    name: 'Swiss Navy Water Based Lube 16 oz',  
+    tagline: 'Smooth water-based glide in a generous size.',  
+    material: 'Water-based lubricant',  
+    image: '/images/products/SNWL16-swiss-navy-water-based-lube-16oz.jpg',  
+    description:  
+      'A smooth water-based formula in a generous 16 fl oz bottle for keeping more glide within reach.',  
+    specs: [  
+      '16 fl oz',  
+      'Water-based formula',  
+      'SKU: SNWL16',  
+      'UPC: 699439009137',  
+    ],  
+    price: 44.99,  
+    sku: 'SNWL16',  
+    stock: 27,  
+  },  
+  {  
+    id: 'c-65',  
+    slug: 'swiss-navy-silicone-based-lube-1-gal',  
+    category: 'blue-dark-anal',  
+    name: 'Swiss Navy Silicone Based Lube 1 Gal',  
+    tagline: 'Silky silicone glide in a full-gallon format.',  
+    material: 'Silicone-based lubricant',  
+    image: '/images/products/SNSL1G-swiss-navy-silicone-based-lube-1gal.jpeg',  
+    description:  
+      'A smooth silicone-based formula in a 1 gal jug for keeping a high-volume supply on hand.',  
+    specs: [  
+      '1 gal',  
+      'Silicone-based formula',  
+      'SKU: SNSL1G',  
+      'UPC: 699439004231',  
+    ],  
+    price: 399.99,  
+    sku: 'SNSL1G',  
+    stock: 14,  
+  },  
+  {  
+    id: 'c-66',  
+    slug: 'swiss-navy-water-based-lube-1-gal',  
+    category: 'blue-dark-anal',  
+    name: 'Swiss Navy Water Based Lube 1 Gal',  
+    tagline: 'Smooth water-based glide in a full-gallon format.',  
+    material: 'Water-based lubricant',  
+    image: '/images/products/SNWB1G-swiss-navy-water-based-lube-1gal.jpeg',  
+    description:  
+      'A smooth water-based formula in a 1 gal jug for keeping a high-volume supply on hand.',  
+    specs: [  
+      '1 gal',  
+      'Water-based formula',  
+      'SKU: SNWB1G',  
+      'UPC: 699439004224',  
+    ],  
+    price: 209.99,  
+    sku: 'SNWB1G',  
+    stock: 8,  
+  },  
 ];  
Commit message

fix(catalog): withdraw Swiss Navy line from public catalog

Removes c-58 through c-66 from PRODUCTS and preserves them in  
WITHDRAWN_PRODUCTS. The brand has no executed online-seller agreement  
and no signed MAP agreement, so none of the nine may be offered for  
sale.

This executes the removal directive of 2026-09-16, which was recorded  
as complete but never landed in products.ts. All nine records were  
still live and indexed via sitemap.ts, which builds from PRODUCTS.

Records are moved rather than deleted: image paths, UPCs and stock  
counts are preserved for provenance. Loop loses seven of its eighteen  
SKUs; its LOOP_PRODUCT_SKUS set is updated to match so the set keeps  
meaning what its name says.

Run npm run validate:catalog before pushing.  
Three things to expect. Loop drops from eighteen SKUs to eleven. That's the real cost of this change. sitemap.ts needs no edit, because it derives from PRODUCTS and will drop all nine automatically. And the SKU registry is a separate file, so if src/lib/sku-registry.ts carries Swiss Navy entries they need a matching withdrawal in a second commit. That's the next diff, not this one.

Paste it, run the validator, push, and tell me what the build says.

