<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
{
    app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

    $permissions = [
        // Full access permissions
        'kelola profil',
        'kelola struktur',
        'kelola unit usaha',
        'kelola berita',
        'kelola galeri',
        'kelola download',
        'kelola setting',
        'kelola user',

        // View-only permissions
        'kelola profil view',
        'kelola struktur view',
        'kelola unit usaha view'
    ];

    foreach ($permissions as $permission) {
        Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
    }

    // Roles
    $roleSuperadmin = Role::firstOrCreate(['name' => 'superadmin', 'guard_name' => 'web']);
    $roleSuperadmin->givePermissionTo(Permission::all());

    $roleEditor = Role::firstOrCreate(['name' => 'editor', 'guard_name' => 'web']);
    $roleEditor->givePermissionTo([
        'kelola profil',
        'kelola struktur',
        'kelola unit usaha',
        'kelola berita',
        'kelola galeri',
        'kelola download'
    ]);

    $roleViewer = Role::firstOrCreate(['name' => 'viewer', 'guard_name' => 'web']);
    $roleViewer->givePermissionTo([
        'kelola profil view',
        'kelola struktur view',
        'kelola unit usaha view'
    ]);
}
}
