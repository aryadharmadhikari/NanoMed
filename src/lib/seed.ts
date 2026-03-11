import { supabase } from './supabase';
import { products } from '../data/products';
import { blogs } from '../data/blogs';
import { reviews } from '../data/reviews';

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

  if (prodCatError) {
    console.error('Error seeding product categories:', prodCatError);
    return;
  }

  // 2. Seed Blog Categories
  console.log('Seeding Blog Categories...');
  const blogCategoryNames = Array.from(new Set(blogs.map(b => b.category)));
  const blogCategories = blogCategoryNames.map(name => ({
    name,
    slug: slugify(name)
  }));
  const { data: insertedBlogCats, error: blogCatError } = await supabase
    .from('blog_categories')
    .upsert(blogCategories, { onConflict: 'name' })
    .select();

  if (blogCatError) {
    console.error('Error seeding blog categories:', blogCatError);
    return;
  }

  // 3. Seed Authors
  console.log('Seeding Authors...');
  const uniqueAuthors = Array.from(new Map(blogs.map(b => [b.author.id, b.author])).values());
  const { error: authError } = await supabase.from('authors').upsert(uniqueAuthors);
  if (authError) console.error('Error seeding authors:', authError);

  // 4. Seed Products
  console.log('Seeding Products...');
  const formattedProducts = products.map(p => {
    const category = insertedProdCats?.find(c => c.name === p.category);
    return {
      name: p.name,
      price: p.price,
      mrp: p.mrp,
      category_id: category?.id,
      image: p.image,
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

  if (prodError) console.error('Error seeding products:', prodError);

  // 5. Seed Blogs
  console.log('Seeding Blogs...');
  const formattedBlogs = blogs.map(b => {
    const category = insertedBlogCats?.find(c => c.name === b.category);
    return {
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      date: new Date(b.date).toISOString().split('T')[0],
      read_time: b.readTime,
      image: b.image,
      category_id: category?.id,
      author_id: b.author.id,
      is_featured: b.isFeatured || false
    };
  });
  const { error: blogError } = await supabase.from('blogs').upsert(formattedBlogs);
  if (blogError) console.error('Error seeding blogs:', blogError);

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
  if (revError) console.error('Error seeding reviews:', revError);

  console.log('--- Seeding complete! ---');
}
