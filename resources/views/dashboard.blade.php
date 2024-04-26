<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Admin Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <h3>Manage Products</h3>
                    <!-- Products Table -->
                    <a href="{{ route('products.create') }}">Create Product</a>
                    <table>
                        <!-- Table Headings -->
                        <thead>
                            <th>Name</th>
                            <th>Actions</th>
                        </thead>
                        <!-- Table Body -->
                        <tbody>
                            @foreach ($products as $product)
                            <tr>
                                <td class="table-text">
                                    <div>{{ $product->name }}</div>
                                </td>

                                <!-- Edit Button -->
                                <td>
                                    <a href="{{ route('products.edit', $product->id) }}">Edit</a>
                                </td>

                                <!-- Delete Button -->
                                <td>
                                    <form action="{{ route('products.destroy', $product->id) }}" method="POST">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit">Delete</button>
                                    </form>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>

                    <h3>Manage Brands</h3>
                    <!-- Brands Table -->
                    <a href="{{ route('brands.create') }}">Create Brand</a>
                    <!-- ... Similar to the products table ... -->
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
