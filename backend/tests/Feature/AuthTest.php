<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthTest extends TestCase
{

    use RefreshDatabase;


    public function setUp(): void
    {
        parent::setUp();

        Role::factory()->create(['id' => 1, 'name' => 'admin']);
        Role::factory()->create(['id' => 2, 'name' => 'artist']);
        Role::factory()->create(['id' => 3, 'name' => 'listener']);
    }


    public function test_register_user(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => 'passwordtest',
            'role' => 'artist',
        ]);

        $response->assertStatus(201)->assertJsonStructure([
            'status',
            'message',
            'data'
        ]);
    }

    public function test_login_user(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data'
            ]);
    }
}