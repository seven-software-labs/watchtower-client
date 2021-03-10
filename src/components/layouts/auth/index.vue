<template>
<div class="min-h-screen bg-white flex">
  
  <div class="hidden lg:block relative w-0 flex-1">
    <img class="absolute inset-0 h-full w-full object-cover" src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="">
    <div class="w-full h-full flex space-y-1 flex-col items-center justify-center absolute top-0 left-0" style="background: rgba(0,0,0,.7)">
        <div class="max-w-xl space-y-2">
            <h1 class="text-4xl text-white font-bold text-left font-serif">It doesn't have to be difficult.</h1>
            <p class="text-gray-200 text-left text-lg">
                Focus on growing your business, not fighting with your software; Watchtower keeps your customer interactions simple and straightforward.
            </p>
        </div>
    </div>
  </div>

  <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
    <div class="mx-auto w-full max-w-sm lg:w-96">
      <div>
        <img class="h-12 w-auto" src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png" alt="Workflow">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-sm text-gray-600 max-w">
          Or
          <a href="#" class="font-medium text-primary-600 hover:text-secondary-600">
            start your 30-day free trial
          </a>
        </p>
      </div>

      <div class="mt-8">

        <div class="mt-6">
         <slot></slot>
        </div>
      </div>
    </div>
  </div>
</div>


</template>