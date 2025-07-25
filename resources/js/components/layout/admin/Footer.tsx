const Footer = () => {
	return (
		<footer className='bg-white z-50 sticky'>
			<div className='mx-auto px-4 py-8 sm:px-6 lg:px-8 md:px-8 lg:pl-72'>
				<div className='sm:flex sm:items-center sm:justify-between'>
					<div className='flex justify-center text-teal-600 sm:justify-start'>
						{/* <Image
              src={Logo}
              alt="IPOS PRO logo"
              width={100}
              height={100}
              className="w-44"
            /> */}
					</div>

					<p className='mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right'>
						Copyright &copy; {new Date().getFullYear()}. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
