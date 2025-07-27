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
        // Buat role superadmin jika belum ada
        $role = Role::firstOrCreate(['name' => 'superadmin'], ['guard_name' => 'web']);

        // Buat user admin
        $admin = User::firstOrCreate(
            ['email' => 'admin@bumdes.id'],
            [
                'name' => 'Admin BUMDes',
                'password' => Hash::make('password123!'),
            ]
        );

        // Assign role superadmin
        $admin->assignRole($role);
    }
}