import {
	OfficeBuildingIcon,
	TemplateIcon,
	UserAddIcon,
} from '@heroicons/react/solid';

const tabs = [
	{ name: 'Restauraunt', href: '/', icon: OfficeBuildingIcon, id: 0 },
	{ name: 'Menu', href: '/menu', icon: TemplateIcon, id: 1 },
	{
		name: 'Call Waiter',
		href: '/waiter',
		icon: UserAddIcon,
		id: 2,
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

function setId(id) {
	sessionStorage.setItem('id', id);
}

export default function NavBar({ children }) {
	return (
		<div>
			<div className="px-1 py-2 text-center bg-red-300">
				<h2>Skip The Waiter</h2>
			</div>
			<div className="px-1">
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex space-x-4" aria-label="Tabs">
						{tabs.map((tab) => (
							<a
								onClick={() => setId(tab.id)}
								key={tab.name}
								href={tab.href}
								className={classNames(
									tab.id == sessionStorage.getItem('id')
										? 'border-indigo-500 text-indigo-600'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
									'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
								)}
								aria-current={tab.current ? 'page' : undefined}
							>
								<tab.icon
									className={classNames(
										tab.id == sessionStorage.getItem('id')
											? 'text-indigo-500'
											: 'text-gray-400 group-hover:text-gray-500',
										'-ml-0.5 mr-2 h-5 w-5'
									)}
									aria-hidden="true"
								/>
								<span>{tab.name}</span>
							</a>
						))}
					</nav>
				</div>
			</div>
			{children}
		</div>
	);
}
