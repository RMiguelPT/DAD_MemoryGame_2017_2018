<?php

use Illuminate\Database\Seeder;

class ImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        $nbrTiles = 40;
        
        for ($i = 0; $i <= $nbrTiles; ++$i) {
            DB::table('images')->insert($this->insertTile($i));
        }

        DB::table('images')->insert($this->insertTile('hidden', 'hidden'));

    }

    private function insertTile($imgName, $face = 'tile')
    {
        $createdAt = Carbon\Carbon::now();

        return [
            'face' => $face,
            'active' => true,
            'path' => $imgName . '.png',
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
