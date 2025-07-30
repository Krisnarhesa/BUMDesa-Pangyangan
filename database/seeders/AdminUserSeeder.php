<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        $roles = ['admin', 'editor', 'viewer'];

        foreach ($roles as $roleName) {
            Role::firstOrCreate(
                ['name' => $roleName, 'guard_name' => 'sanctum']
            );
        }

        $admin = User::firstOrCreate(
            ['email' => 'admin@bumdes.id'],
            [
                'name' => 'Admin BUMDes',
                'password' => Hash::make('password123!'),
            ]
        );

        if (!$admin->hasRole('admin')) {
            $admin->assignRole('admin');
        }
    }
}
