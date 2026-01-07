# Backend CORS Configuration Check

Based on your backend repository: https://github.com/manichandra37/Springboot_first.git

## What to Check in Your Spring Boot Backend

### 1. Check for CORS Configuration

Look for one of these configurations in your Spring Boot backend:

#### Option A: Global CORS Configuration (Recommended)
Look for a `@Configuration` class with CORS setup:

```java
@Configuration
public class CorsConfig {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                            "https://your-netlify-app.netlify.app",
                            "http://localhost:5173",
                            "http://localhost:3000"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

#### Option B: Controller-Level CORS
Check your MovieController and ReviewController:

```java
@CrossOrigin(origins = {
    "https://your-netlify-app.netlify.app",
    "http://localhost:5173"
})
@RestController
@RequestMapping("/movies")
public class MovieController {
    // ...
}
```

#### Option C: Security Configuration
If using Spring Security, check SecurityConfig:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
        // ... other security config
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(
            "https://your-netlify-app.netlify.app",
            "http://localhost:5173"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### 2. Common Issues

1. **Missing Netlify Domain**: Make sure your Netlify domain is in the allowed origins list
2. **Wildcard Not Working**: `allowedOrigins("*")` doesn't work with `allowCredentials(true)` - you must specify exact origins
3. **OPTIONS Method**: Make sure OPTIONS method is allowed for preflight requests

### 3. Quick Fix Template

Add this to your backend if CORS is not configured:

```java
package com.yourpackage.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                    "https://your-netlify-app.netlify.app",  // Replace with your Netlify URL
                    "http://localhost:5173",
                    "http://localhost:3000"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

### 4. Verify Your Netlify URL

Replace `your-netlify-app.netlify.app` with your actual Netlify deployment URL.

### 5. Test After Changes

After updating CORS configuration:
1. Rebuild and redeploy your Spring Boot backend
2. Clear browser cache
3. Test adding a movie again
4. Check browser console for CORS errors

