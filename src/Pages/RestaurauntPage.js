const collections = [
	{
		name: 'Wood Fire Pizzas',
		description: 'Fresh Thin crust pizzas',
		imageSrc: 'https://i.ibb.co/jrswXzR/pizza.jpg',
		imageAlt:
			'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
		href: '/menu',
	},
	{
		name: 'Pasta',
		description: 'House made noodles and fresh sauces',
		imageSrc: 'https://i.ibb.co/1LKwRKb/pasta.jpg',
		imageAlt:
			'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
		href: '/menu',
	},
	{
		name: 'Anti-pasta',
		description: 'All the other stuff',
		imageSrc: 'https://i.ibb.co/qNgD5tv/steak.jpg',
		imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
		href: '/menu',
	},
];

const restauraunt = [
	{
		name: 'Tonys Pizza Shop',
		description:
			'Authentic Italian Pizza in London, Ontario. All pizzas are made fresh in our woodfire pizza oven',
		imageSrc:
			'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
	},
];

function setId(id) {
	sessionStorage.setItem('id', id);
}

export default function RestaurauntPage() {
	return (
		<div className="bg-white">
			<main>
				{/* Hero */}
				<div className="flex flex-col border-b border-gray-200 lg:border-0">
					<div className="relative">
						<div className="relative bg-gray-100 lg:bg-transparent">
							<div className="max-w-7xl mx-auto px-4 sm:px-6">
								<div className="max-w-2xl mx-auto py-8 lg:py-64 lg:max-w-none">
									<div className="p-10 rounded-lg bg-white text-center">
										{restauraunt.map((restauraunt) => (
											<div className="lg:pr-16">
												<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
													{restauraunt.name}
												</h1>
												<p className="mt-4 text-lg text-gray-600">
													{restauraunt.description}
												</p>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Collections */}
				<section aria-labelledby="collections-heading" className="bg-gray-100">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
							<h2
								id="collections-heading"
								className="text-2xl font-extrabold text-gray-900"
							>
								Customer Favourites
							</h2>

							<div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
								{collections.map((collection) => (
									<div
										onClick={() => setId(1)}
										key={collection.name}
										className="group relative"
									>
										<div className="relative w-full h-48 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-32 lg:aspect-w-1 lg:aspect-h-1">
											<img
												src={collection.imageSrc}
												alt={collection.imageAlt}
												className="w-full h-full object-center object-cover"
											/>
										</div>
										<h3 className="mt-6 text-base font-semibold text-gray-900">
											<a href={collection.href}>
												<span className="absolute inset-0" />
												{collection.name}
											</a>
										</h3>
										<p className="text-sm text-gray-600">
											{collection.description}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
