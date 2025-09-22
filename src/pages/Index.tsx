import { ApiMethodDemo } from "@/components/ApiMethodDemo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Code, Database, Globe, Users, Plus, Edit, Trash } from "lucide-react";
import heroImage from "@/assets/rest-api-hero.jpg";

const Index = () => {
  const apiExamples = [
    {
      method: "GET" as const,
      endpoint: "/api/users",
      description: "Retrieve all users from the database",
      frontendCode: `// React Frontend - Fetching users
const fetchUsers = async () => {
  try {
    const response = await fetch('/api/users');
    const users = await response.json();
    setUsers(users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

useEffect(() => {
  fetchUsers();
}, []);`,
      backendCode: `// Spring Boot Backend - GET endpoint
@RestController
@RequestMapping("/api")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }
}`,
      explanation: [
        "Import necessary React hooks (useEffect for side effects)",
        "Create async function to handle the API call",
        "Use fetch() to make HTTP GET request to our endpoint",
        "Convert response to JSON format",
        "Update component state with the received data",
        "Handle any errors that might occur during the request",
        "Use useEffect to call the function when component mounts"
      ],
      mockResponse: [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" }
      ]
    },
    {
      method: "POST" as const,
      endpoint: "/api/users",
      description: "Create a new user in the system",
      frontendCode: `// React Frontend - Creating a new user
const createUser = async (userData) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    const newUser = await response.json();
    setUsers([...users, newUser]);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};`,
      backendCode: `// Spring Boot Backend - POST endpoint
@PostMapping("/users")
public ResponseEntity<User> createUser(@RequestBody User user) {
    try {
        User savedUser = userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                           .body(savedUser);
    } catch (Exception e) {
        return ResponseEntity.badRequest().build();
    }
}`,
      explanation: [
        "Define async function that accepts user data as parameter",
        "Specify POST method in fetch options",
        "Set Content-Type header to indicate JSON data",
        "Convert user data to JSON string in request body",
        "Extract the newly created user from response",
        "Update local state by adding new user to existing array",
        "Handle any errors during the creation process"
      ],
      mockResponse: { id: 3, name: "New User", email: "newuser@example.com", createdAt: "2024-01-15T10:30:00Z" }
    },
    {
      method: "PUT" as const,
      endpoint: "/api/users/{id}",
      description: "Update existing user information",
      frontendCode: `// React Frontend - Updating user data
const updateUser = async (userId, updatedData) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData)
    });
    
    const updatedUser = await response.json();
    setUsers(users.map(user => 
      user.id === userId ? updatedUser : user
    ));
  } catch (error) {
    console.error('Error updating user:', error);
  }
};`,
      backendCode: `// Spring Boot Backend - PUT endpoint  
@PutMapping("/users/{id}")
public ResponseEntity<User> updateUser(
    @PathVariable Long id, 
    @RequestBody User userDetails) {
    
    Optional<User> userOptional = userService.findById(id);
    if (userOptional.isPresent()) {
        User user = userOptional.get();
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        User updatedUser = userService.save(user);
        return ResponseEntity.ok(updatedUser);
    }
    return ResponseEntity.notFound().build();
}`,
      explanation: [
        "Function takes userId and updated data as parameters",
        "Use template literals to include userId in URL path",
        "Specify PUT method for updating existing resources",
        "Include updated data in JSON format in request body",
        "Map through existing users array to find and update the specific user",
        "Replace old user data with updated user data",
        "Keep all other users unchanged in the array"
      ],
      mockResponse: { id: 1, name: "John Updated", email: "john.updated@example.com", updatedAt: "2024-01-15T10:35:00Z" }
    },
    {
      method: "DELETE" as const,
      endpoint: "/api/users/{id}",
      description: "Remove a user from the system",
      frontendCode: `// React Frontend - Deleting a user
const deleteUser = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      setUsers(users.filter(user => user.id !== userId));
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};`,
      backendCode: `// Spring Boot Backend - DELETE endpoint
@DeleteMapping("/users/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    try {
        if (userService.existsById(id)) {
            userService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    } catch (Exception e) {
        return ResponseEntity.internalServerError().build();
    }
}`,
      explanation: [
        "Create async function that takes userId as parameter",
        "Use template literals to include userId in URL path",
        "Specify DELETE method for removing resources",
        "No request body needed for DELETE operations",
        "Check if response was successful (status 200-299)",
        "Filter out the deleted user from local state",
        "Update users array to exclude the deleted user"
      ],
      mockResponse: { message: "User deleted successfully", deletedId: 1 }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-gradient">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-white space-y-4 sm:space-y-6 text-center lg:text-left">
              <Badge className="bg-white/20 text-white border-white/30 w-fit mx-auto lg:mx-0">
                <Code className="w-4 h-4 mr-2" />
                Educational Demo
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Master RESTful APIs with 
                <span className="text-accent"> Spring Boot</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Learn REST API concepts through interactive examples, complete with React frontend 
                and Spring Boot backend code explanations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                  <Book className="w-5 h-5 mr-2" />
                  Start Learning
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  <Users className="w-5 h-5 mr-2" />
                  Teach Friends
                </Button>
              </div>
            </div>
            <div className="relative order-first lg:order-last">
              <img 
                src={heroImage} 
                alt="REST API Visualization" 
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:max-w-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* REST Methods Overview */}
      <section className="py-12 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">HTTP Methods Explained</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Understanding the four fundamental HTTP methods used in RESTful API design
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { method: "GET", description: "Retrieve data", icon: Database, color: "success" },
              { method: "POST", description: "Create new data", icon: Plus, color: "info" },
              { method: "PUT", description: "Update existing data", icon: Edit, color: "warning" },
              { method: "DELETE", description: "Remove data", icon: Trash, color: "destructive" }
            ].map(({ method, description, icon: Icon, color }, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4 sm:pb-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-${color}/20 flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${color}`} />
                  </div>
                  <CardTitle className="text-base sm:text-lg">{method}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive API Demos */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Interactive API Examples</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Try out each HTTP method with live code examples and detailed explanations
            </p>
          </div>
          
          <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
            {apiExamples.map((example, index) => (
              <ApiMethodDemo key={index} {...example} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-primary-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto text-white space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Ready to Build Your Own API?</h2>
            <p className="text-lg sm:text-xl text-white/90">
              Now that you understand REST concepts, start building your own Spring Boot application!
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
              <Globe className="w-5 h-5 mr-2" />
              Explore More Examples
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
