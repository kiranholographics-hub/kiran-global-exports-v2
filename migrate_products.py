from pathlib import Path

p = Path('/home/ubuntu/kiran-global-exports/frontend/src/data/products.js')
text = p.read_text()
marker = "  {\n    id: 'rg-001'"
rug_start = text.index(marker)
rug_block = text[rug_start:text.index('\n];', rug_start)]
header = """// Product source of truth for editorial B2B catalogue pages.\n// Towel records are grounded in the supplied TowelsAlbum.zip. Rugs remain\n// separate and preserve the existing project structure and inquiry flow.\nimport { towelProducts } from './towelCatalog';\n\nexport const products = [\n  ...towelProducts,\n"""
footer = """\n];\n\nexport function getAllProducts() {\n  return products;\n}\n\nexport function getProductsByCategory(categorySlug) {\n  return products.filter((p) => p.category === categorySlug);\n}\n\nexport function getProductsBySubcategory(subcategorySlug) {\n  return products.filter((p) => p.subcategory === subcategorySlug);\n}\n\nexport function getProductBySlug(slug) {\n  return products.find((p) => p.slug === slug);\n}\n\nexport function getFeaturedProducts(limit = 4) {\n  return products.filter((p) => p.featured).slice(0, limit);\n}\n\nexport function getRelatedProducts(product, limit = 3) {\n  return products\n    .filter((p) => p.slug !== product.slug && p.category === product.category)\n    .slice(0, limit);\n}\n"""
p.write_text(header + rug_block + footer)
print('migrated products.js')
