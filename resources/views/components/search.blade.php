<div
    x-data="{
        search: '',
        open: false,
        items: ['Bitcoin', 'Ethereum', 'Siacoin'],

        get filteredItems() {
            return this.items.filter(
                i => i.toLowerCase().startsWith(this.search.toLowerCase())
            )
        }
    }"
    class="min-h-screen bg-gray-50 py-6 flex flex-col items-center justify-center relative overflow-hidden sm:py-12">
    <input x-on:click="open = !open" type="search" x-model="search" placeholder="Search Here..." class="py-3 px-4 w-1/2 rounded shadow font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-200 duration-100 shadow-gray-100">


    <ul x-show="open" x-on:click.outside="open = !open"  x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 translate"
        x-transition:enter-end="opacity-100 translate"
        x-transition:leave="transition ease-in duration-300"
        x-transition:leave-start="opacity-100 translate"
        x-transition:leave-end="opacity-0 translate"  class="w-1/2">
        <template x-for="item in filteredItems" :key="item">
            <li class="w-full text-gray-700 p-4 mt-2 bg-white" x-text="item"></li>
        </template>
    </ul>

</div>
