<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
       public function get(Request $request)
       {
           $query = Product::query();

           // Обработка множественных brand_id
           if ($request->has('brands')) {
               $brandIds = explode(',', $request->brands);
               $query->whereIn('brand_id', $brandIds);
           }

           // Обработка множественных strength
           if ($request->has('strength')) {
               $strengths = explode(',', $request->strength);
               $query->whereIn('strength', $strengths);
           }

           // Обработка множественных charger
           if ($request->has('chargers')) {
               $chargers = explode(',', $request->chargers);
               $query->whereIn('charger', $chargers);
           }

           // Обработка множественных puffs
           if ($request->has('puffs')) {
               $puffsArray = explode(',', $request->puffs);
               $query->whereIn('puffs', $puffsArray);
           }

           // Обработка множественных tastes
           if ($request->has('tastes')) {
               $tastesArray = explode(',', $request->tastes);
               foreach ($tastesArray as $tastes) {
                   $taste = '%' . trim($tastes) . '%';
                   $query->orWhere('taste', 'LIKE', $taste);
               }
           }

           // Пагинация
           if ($request->has('limit')) {
               $query->limit($request->limit);
           }

           if ($request->has('offset')) {
               $query->offset($request->offset);
           }

           $products = $query->get();
           return response()->json($products);
       }


        public function getUniqueTastes()
        {
            // Получаем все вкусы из всех продуктов и преобразуем их в массив
            $tastes = Product::all()->pluck('taste')->toArray();

            // Разбиваем строки на массивы и объединяем их в один массив
            $allTastes = [];
            foreach ($tastes as $tasteString) {
                $allTastes = array_merge($allTastes, explode(',', $tasteString));
            }

            // Удаляем пробелы и делаем массив уникальным
            $uniqueTastes = array_unique(array_map('trim', $allTastes));

            return response()->json(array_values($uniqueTastes)); // array_values для переиндексации массива
        }

        public function getUniquePuffs()
        {
            // Получаем все уникальные значения затяжек
            $uniquePuffs = Product::select('puffs')->distinct()->pluck('puffs');

            return response()->json($uniquePuffs);
        }

        public function getByBrand($brandId)
            {
                $products = Product::where('brand_id', $brandId)->get();
                return response()->json($products);
            }

        public function getByStrength($strength)
            {
                $products = Product::where('strength', $strength)->get();
                return response()->json($products);
            }

        public function getByCharger($charger)
            {
                $products = Product::where('charger', $charger)->get();
                return response()->json($products);
            }

        public function getByPuffs($puffs)
                {
                    $products = Product::where('puffs', $puffs)->get();
                    return response()->json($products);
                }

        public function getByTaste(Request $request)
            {
                // Получаем строку вкусов из запроса
                $tastes = $request->input('tastes'); // Например, 'личи, карамель'

                // Разделяем строку на массив вкусов
                $tastesArray = explode(',', $tastes);

                // Удаляем пробелы вокруг вкусов и приводим к нижнему регистру для унификации
                $tastesArray = array_map(function($item) {
                    return '%' . trim(strtolower($item)) . '%';
                }, $tastesArray);

                $query = Product::query();

                // Применяем условия поиска для каждого вкуса
                foreach ($tastesArray as $taste) {
                    $query->orWhere('taste', 'LIKE', $taste);
                }

                // Получаем продукты, соответствующие критериям
                $products = $query->get();

                return response()->json($products);
            }


        public function show($id)
            {
                $product = Product::findOrFail($id);
                return response()->json($product);
            }

        public function store(Request $request)
        {
            $validatedData = $request->validate([
                'name' => 'required|max:200',
                'description' => 'required',
                'puffs' => 'required|integer',
                'price' => 'required|integer',
                'brand' => 'required|max:120',
                // 'brand_id' => 'exists:brands,id', // Если у вас есть таблица brands
                'image' => 'required|max:200',
                'strength' => 'required|integer',
                'puff_type' => 'required|max:30',
                'taste' => 'required|max:120',
                'charger' => 'required|boolean',

            ]);

            $product = Product::create($validatedData);

            return response()->json($product, 201);
        }
}
