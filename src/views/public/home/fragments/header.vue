<template>
    <div class="relative bg-white font-montserrat">
        <x-container class="py-6 mx-auto flex justify-between items-center md:justify-start md:space-x-10">
            <div>
                <router-link :to="{ name: 'public.home' }" class="flex">
                    <span class="sr-only">Watchtower</span>
                    <x-application-logo/>
                </router-link>
            </div>

            <div class="-mr-2 -my-2 md:hidden">
                <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500" aria-expanded="false">
                    <span class="sr-only">Open menu</span>
                    <!-- Heroicon name: outline/menu -->
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            <div class="hidden md:flex-1 md:flex md:items-center md:justify-between">
                <nav class="flex space-x-10">
                    <a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900">
                        Home
                    </a>

                    <a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900">
                        Features
                    </a>

                    <a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900">
                        Channels
                    </a>
                    <a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900">
                        Pricing
                    </a>
                </nav>

                <div class="flex items-center md:ml-12">
                    <a href="#" class="text-base font-medium text-gray-500 hover:text-gray-900">
                    Sign in
                    </a>
                    <a href="#" class="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700">
                    Sign up
                    </a>
                </div>
            </div>
        </x-container>
    </div>
</template>