import { supabase } from './supabase';
import { products } from '../mockdata/products';
import { blogs } from '../mockdata/blogs';
import { reviews } from '../mockdata/reviews';

const slugify = (text: string) => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

export async function seedDatabase() {
  console.log('--- Starting Seed ---');

  // 1. Seed Product Categories
  console.log('Seeding Product Categories...');
  const productCategoryNames = Array.from(new Set(products.map(p => p.category)));
  const productCategories = productCategoryNames.map(name => ({
    name,
    slug: slugify(name)
  }));
  const { data: insertedProdCats, error: prodCatError } = await supabase
    .from('product_categories')
    .upsert(productCategories, { onConflict: 'name' })
    .select();

  if (prodCatError) throw new Error(`Error seeding product categories: ${prodCatError.message}`);


  // 4. Seed Products
  console.log('Seeding Products...');
  const formattedProducts = products.map(p => {
    const category = insertedProdCats?.find(c => c.name === p.category);
    return {
      name: p.name.split(' | ')[0].trim(),
      subtitle: p.name.includes(' | ') ? p.name.split(' | ')[1].trim() : null,
      price: p.price,
      mrp: p.mrp,
      category_id: category?.id,
      images: [p.image],
      description: p.description,
      features: p.features || [],
      specifications: p.specifications || {},
      ideal_for: p.idealFor || []
    };
  });

  const { data: insertedProducts, error: prodError } = await supabase
    .from('products')
    .upsert(formattedProducts)
    .select();

  if (prodError) throw new Error(`Error seeding products: ${prodError.message}`);


  // 6. Seed Reviews (Generic linkage to first matching product or random for demo)
  console.log('Seeding Reviews...');
  const formattedReviews = reviews.map((r, index) => {
    const product = insertedProducts ? insertedProducts[index % insertedProducts.length] : null;
    return {
      product_id: product?.id,
      name: r.name,
      location: r.location,
      rating: r.rating,
      comment: r.comment,
      date: new Date(r.date).toISOString().split('T')[0],
      verified: r.verified,
      avatar: r.avatar
    };
  });
  const { error: revError } = await supabase.from('reviews').upsert(formattedReviews);
  if (revError) throw new Error(`Error seeding reviews: ${revError.message}`);

  console.log('--- Seeding complete! ---');
}

// Automatically execute if run directly
seedDatabase().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
});
