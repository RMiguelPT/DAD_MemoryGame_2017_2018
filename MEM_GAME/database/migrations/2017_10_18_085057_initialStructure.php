<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InitialStructure extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('nickname')->unique();
            $table->boolean('admin')->default(false);
            $table->boolean('blocked')->default(false);
            $table->string('reason_blocked')->nullable();
            $table->string('reason_reactivated')->nullable();
            $table->timestamps();
        });

        Schema::create('password_resets', function (Blueprint $table) {
            $table->string('email')->index();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('config', function (Blueprint $table) {
            $table->increments('id');
            $table->string('platform_email');
            $table->string('platform_email_properties');
            $table->string('img_base_path');
            $table->timestamps();
        });

        Schema::create('images', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('face', ['hidden', 'tile'])->default('tile');
            $table->boolean('active')->default(true);
            $table->string('path');
            $table->timestamps();
        });

        Schema::create('games', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('type', ['singleplayer', 'multiplayer']);
            $table->enum('status', ['pending', 'active', 'terminated', 'canceled'])->default('pending');
            $table->integer('total_players')->default(1);
            $table->integer('created_by')->unsigned();
            $table->foreign('created_by')->references('id')->on('users');
            $table->integer('winner')->unsigned()->nullable();
            $table->foreign('winner')->references('id')->on('users');
            $table->timestamps();
        });

        Schema::create('game_user', function (Blueprint $table) {
            $table->integer('game_id')->unsigned();
            $table->foreign('game_id')->references('id')->on('games')->onDelete('cascade');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('game_user');
        Schema::dropIfExists('games');
        Schema::dropIfExists('images');
        Schema::dropIfExists('config');
        Schema::dropIfExists('password_resets');
        Schema::dropIfExists('users');
    }
}
