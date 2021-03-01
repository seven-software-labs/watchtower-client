<template>
    <x-layouts-panel>
        <template v-slot:asideLeft>
            <x-section-header>
                <template v-slot:title>
                    Details
                </template>
            </x-section-header>

            <x-table>
                <thead>
                    <x-table-row>
                        <x-table-header>Ticket Details</x-table-header>
                    </x-table-row>
                </thead>

                <tbody>
                    <x-table-row>
                        <x-table-data>
                            <ul class="space-y-4">
                                <li>
                                    Department
                                    <input class="block w-full py-2 px-4 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm">
                                </li>

                                <li>
                                    <div class="grid grid-cols-2 gap-2">
                                        <div>
                                            Status
                                            <input class="block w-full py-2 px-4 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm">
                                        </div>

                                        <div>
                                            Priority
                                            <input class="block w-full py-2 px-4 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm">
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    Due Time
                                    <input class="block w-full py-2 px-4 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm">
                                </li>

                                <li>
                                    Linked Tickets
                                    <input class="block w-full py-2 px-4 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm">
                                </li>

                                <li>
                                    Assigned Users
                                    <input class="block w-full py-2 px-4 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm">
                                </li>
                            </ul>
                        </x-table-data>
                    </x-table-row>
                </tbody>

                <thead>
                    <x-table-row>
                        <x-table-header>Custom Fields</x-table-header>
                    </x-table-row>
                </thead>

                <thead>
                    <x-table-row>
                        <x-table-header>Time Tracking</x-table-header>
                    </x-table-row>
                </thead>
            </x-table>
        </template>

        <template v-slot:default>
            <x-section-header>
                <template v-slot:toolbar>
                    <x-button color="white">
                        Note
                    </x-button>
                </template>
            </x-section-header>

            <x-section-header>
                <template v-slot:title>
                    #000001 - This is a random ticket subject.
                </template>

                <template v-slot:description>
                    <x-link :to="{ name: 'users.edit', params: { user: 1 } }">Mark Cuban</x-link>, <x-link :to="{ name: 'organizations.edit', params: { organization: 1 } }">Dallas Mavericks, Inc.</x-link>
                </template>
            </x-section-header>

            <div class="max-h-full border-b border-gray-200 overflow-x-hidden overflow-y-auto">

            <ul class="py-4 space-y-2 sm:px-6 sm:space-y-4">
              
                <li class="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
                  <div class="sm:flex sm:justify-between sm:items-baseline">
                    <h3 class="text-base font-medium">
                      <span class="text-gray-900">Joe Armstrong</span>
                      <!-- space -->
                      <span class="text-gray-600">wrote</span>
                    </h3>
                    <p class="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                      <time datetime="2021-01-28T19:24">Yesterday at 7:24am</time>
                    </p>
                  </div>
                  <div class="mt-4 space-y-6 text-sm text-gray-800">
                    <p>Thanks so much! Can't wait to try it out.</p>
                  </div>
                </li>
              
                <li class="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
                  <div class="sm:flex sm:justify-between sm:items-baseline">
                    <h3 class="text-base font-medium">
                      <span class="text-gray-900">Monica White</span>
                      <!-- space -->
                      <span class="text-gray-600">wrote</span>
                    </h3>
                    <p class="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                      <time datetime="2021-01-27T16:35">Wednesday at 4:35pm</time>
                    </p>
                  </div>
                  <div class="mt-4 space-y-6 text-sm text-gray-800">
                    
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.
                    </p>
                    <p>
                    Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.
                    </p>
                    <p>
                    <strong style="font-weight: 600;">Monica White</strong><br>
                    Customer Service
                    </p>
          
                  </div>
                </li>
              
                <li class="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
                  <div class="sm:flex sm:justify-between sm:items-baseline">
                    <h3 class="text-base font-medium">
                      <span class="text-gray-900">Joe Armstrong</span>
                      <!-- space -->
                      <span class="text-gray-600">wrote</span>
                    </h3>
                    <p class="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                      <time datetime="2021-01-27T16:09">Wednesday at 4:09pm</time>
                    </p>
                  </div>
                  <div class="mt-4 space-y-6 text-sm text-gray-800">
                    
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.
            </p>
            <p>
              Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.
            </p>
            <p>
              – Joe
            </p>
          
                  </div>
                </li>
              
            </ul>
            </div>

            <div class="py-4 bg-white">
                <x-container>
                    test
                </x-container>
            </div>
        </template>
    </x-layouts-panel>
</template>