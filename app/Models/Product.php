<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    use Sluggable;

    protected $guarded  = [];

    protected $casts = [
        'sell_price' => 'double',
        'buy_price' => 'double',
        'amount' => 'int',
    ];

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            "slug" => [
                "source" => "title",
            ],
        ];
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return "slug";
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function sales() {
        return $this->hasMany(Sale::class);
    }
}
