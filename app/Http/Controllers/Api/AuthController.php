<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Http\Controllers\Controller;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json([], 200);
        }

        return response()->json([
            'msg' => 'The provided credentials do not match our records.',
        ], 412);
    }

    public function register(Request $request)
    {
        $credentials = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required','confirmed','min:8']
        ]);

        User::create([
            'email' => $credentials['email'],
            'password' => Hash::make($credentials['password']),
            'name' => $credentials['name']
        ]);

        return response()->json([
            'msg' => 'Successfully registered',
        ], 200);
    }

    public function user(Request $request)
    {
        return $request->user();
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'msg' => 'Logged successfully',
        ], 200);
    }

}