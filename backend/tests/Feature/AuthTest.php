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

    public function test_login_with_invalid_creds(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'email' => 'random@gmail.com',
            'password' => 'passsssssw',
        ]);

        $response->assertStatus(422);
    }

    public function test_login_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'baddddpaaaaaa',
        ]);

        $response->assertStatus(401)
            ->assertJsonStructure([
                'status',
                'message',
                'data'
            ]);
    }

    public function test_logout_user()
    {
        $user = User::factory()->create();
        $tokenResponse = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $tokenResponse->assertStatus(200);

        $token = $tokenResponse->json('data.token');

        $response = $this->withHeaders([
            'Authorization' => "Bearer $token"
        ])->postJson('/api/auth/logout');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Logged out successfully',
                'data' => null
            ]);
    }
}
