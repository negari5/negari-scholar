import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const { email, firstName, lastName, phone, city, userType, isAdmin } = await req.json()
    
    console.log('Creating user:', { email, firstName, lastName, userType, isAdmin });

    // Generate a random temporary password
    const tempPassword = Math.random().toString(36).slice(-12) + 'A1!';
    
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`.trim()
      }
    })

    if (authError) {
      console.error('Auth error:', authError);
      throw authError;
    }

    console.log('User created in auth:', authData.user?.id);

    // Update profile with additional info
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({
        full_name: `${firstName} ${lastName}`.trim(),
        phone_number: phone || null,
        address: city || null,
        account_type: userType || 'student'
      })
      .eq('id', authData.user.id);

    if (profileError) {
      console.error('Profile update error:', profileError);
    }

    // Send welcome email with credentials
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .credentials { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Negari!</h1>
            </div>
            <div class="content">
              <p>Hi ${firstName},</p>
              <p>Your account has been created by an administrator. Here are your login credentials:</p>
              
              <div class="credentials">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Temporary Password:</strong> ${tempPassword}</p>
              </div>
              
              <p><strong>Important:</strong> Please change your password after your first login for security purposes.</p>
              
              <a href="${Deno.env.get('SUPABASE_URL')?.replace('/supabase', '')}" class="button">Login to Negari</a>
              
              <p>If you have any questions, please don't hesitate to contact our support team.</p>
              
              <div class="footer">
                <p>© 2024 Negari. All rights reserved.</p>
                <p>This is an automated message, please do not reply.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Supabase's auth email (this will use the SMTP configured in Supabase)
    // Note: In production, you'd use a proper email service
    console.log('Email would be sent to:', email);
    console.log('Temporary password:', tempPassword);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'User created successfully',
        userId: authData.user.id,
        temporaryPassword: tempPassword,
        email: email
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
