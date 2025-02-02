import fs from 'fs/promises';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import path from 'path'

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>
      ))}
    </ul>
  );
}
export async function getStaticProps(context) {
  const filepath = path.join(process.cwd(), 'data' , 'dummy-backend.json')//cwd- current working directory
  const jsonData = await fs.readFile(filepath)
  const data = JSON.parse(jsonData)

  if(!data){
    return{
      redirect:{
        destination:'/no-data'
      }
    }
  }


if(data.products.length === 0){
  return {notFound: true}
}

  return {
    props: {
      products: data.products,
    },
    revalidate:10,
    
  };
}
export default HomePage;
