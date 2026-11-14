const blogFeed = document.getElementById('blog-feed');
const canvas = document.getElementById('pixel-cat');
const ctx = canvas.getContext('2d');
const modal = document.getElementById('article-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

// 10 Detailed Technical Articles for Hacker News
const articles = [
    {
        title: "Rust vs C++ for System Programming: A Deep Dive",
        tag: "DevOps",
        date: "Oct 12, 2024",
        content: `
            <h1>Rust vs C++ for System Programming: A Deep Dive</h1>
            <p><strong>Posted by NASURIYA | DevOps & Systems Engineering</strong></p>
            
            <h2>Introduction</h2>
            <p>The debate between Rust and C++ has been raging in the systems programming community for years. Both languages offer low-level memory control, but they approach safety and performance differently. As a developer who has worked with both extensively, I want to provide an honest comparison based on real-world projects.</p>
            
            <h2>C++: The Veteran</h2>
            <p>C++ has been around since 1985 and powers everything from operating systems to game engines. Its strength lies in decades of optimization, massive ecosystem support, and mature tooling. However, the manual memory management is a constant source of bugs.</p>
            
            <pre><code>std::unique_ptr&lt;MyClass&gt; ptr = std::make_unique&lt;MyClass&gt;(arg1, arg2);</code></pre>
            
            <h2>Rust: The Challenger</h2>
            <p>Rust was designed to solve C++'s memory safety issues without sacrificing performance. Its ownership model is revolutionary but has a steep learning curve. Here's what I've learned after 6 months of production Rust development:</p>
            
            <h2>Performance Comparison</h2>
            <p>In my benchmarks, both languages compile to similar machine code. The difference comes in runtime behavior and developer productivity. C++ can be faster in raw execution due to decades of micro-optimizations, but Rust catches many bugs at compile time.</p>
            
            <h2>Memory Safety</h2>
            <p>This is Rust's killer feature. No more use-after-free, buffer overflows, or data races. The borrow checker enforces these rules at compile time:</p>
            
            <pre><code>fn process(data: &mut [u8]) {
    // Compiler ensures no aliasing violations
    for byte in data.iter_mut() {
        *byte += 1;
    }
}</code></pre>
            
            <h2>Ecosystem Maturity</h2>
            <p>C++ wins here hands down. The standard library is battle-tested, and every tool you need exists. Rust's ecosystem is growing rapidly but still lacks some mature packages.</p>
            
            <h2>Conclusion</h2>
            <p>For new projects where safety matters, choose Rust. For maintaining legacy systems or when you need maximum control, C++ remains king. The future likely involves both coexisting in different domains.</p>
        `
    },
    {
        title: "Why I Love CSS Grid: A Complete Guide",
        tag: "Frontend",
        date: "Sep 05, 2024",
        content: `
            <h1>Why I Love CSS Grid: A Complete Guide</h1>
            <p><strong>Posted by NASURIYA | Frontend Development</strong></p>
            
            <h2>The Problem with Flexbox Alone</h2>
            <p>Flexbox is amazing for 1-dimensional layouts, but when you need complex 2D grids, it becomes a nightmare. I've spent countless hours fighting with nested flex containers just to create simple grid layouts.</p>
            
            <h2>CSS Grid: The Game Changer</h2>
            <p>CSS Grid was built specifically for 2-dimensional layouts. It's not just another layout method—it's a complete paradigm shift in how we think about web design.</p>
            
            <pre><code>.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}</code></pre>
            
            <h2>Key Features</h2>
            <ul>
                <li><strong>Grid Template Areas:</strong> Define complex layouts with named areas</li>
                <li><strong>Subgrid:</strong> Inherit parent grid properties automatically</li>
                <li><strong>Auto-fit & Auto-fill:</strong> Responsive grids without media queries</li>
            </ul>
            
            <pre><code>.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}</code></pre>
            
            <h2>Real-World Example</h2>
            <p>I recently rebuilt my entire portfolio using only CSS Grid. The result? Cleaner code, better performance, and easier maintenance.</p>
            
            <blockquote>"CSS Grid is not just a feature—it's a fundamental shift in how we approach layout design."</blockquote>
            
            <h2>Conclusion</h2>
            <p>If you're still using Flexbox for everything, it's time to learn CSS Grid. It will change how you build layouts forever.</p>
        `
    },
    {
        title: "JavaScript Async/Await Deep Dive",
        tag: "Backend",
        date: "Aug 22, 2024",
        content: `
            <h1>JavaScript Async/Await Deep Dive</h1>
            <p><strong>Posted by NASURIYA | Backend Development</strong></p>
            
            <h2>The Promise Problem</h2>
            <p>Callbacks were the original solution to asynchronous JavaScript, but they led to "callback hell" that was hard to read and maintain. Promises improved this, but async/await took it to the next level.</p>
            
            <pre><code>// Callback Hell (The Old Way)
getData(function(result) {
    processData(result, function(processed) {
        saveData(processed, function(saved) {
            console.log('Done!');
        });
    });
});</code></pre>
            
            <h2>Async/Await: The Modern Approach</h2>
            <p>async/await makes asynchronous code look synchronous while maintaining non-blocking behavior:</p>
            
            <pre><code>// Async/Await (The New Way)
async function fetchData() {
    const result = await getData();
    const processed = await processData(result);
    await saveData(processed);
    console.log('Done!');
}</code></pre>
            
            <h2>Understanding the Mechanics</h2>
            <p>Under the hood, async/await is just syntactic sugar over Promises. When you use await, JavaScript pauses execution until the Promise resolves:</p>
            
            <pre><code>async function example() {
    try {
        const data = await fetch('/api/data');
        return await data.json();
    } catch (error) {
        console.error('Error:', error);
    }
}</code></pre>
            
            <h2>Error Handling</h2>
            <p>One of the biggest advantages is clean error handling with try/catch:</p>
            
            <pre><code>try {
    await riskyOperation();
} catch (error) {
    // Handle errors gracefully
    logger.error(error);
}</code></pre>
            
            <h2>Performance Considerations</h2>
            <p>async/await doesn't change performance—it's purely syntactic. However, it makes code more readable and maintainable, which indirectly improves performance by reducing bugs.</p>
            
            <h2>Conclusion</h2>
            <p>If you're still using callbacks or Promises without async/await, you're missing out on cleaner, more maintainable code. Make the switch today!</p>
        `
    },
    {
        title: "Building a CLI Tool in Go",
        tag: "Golang",
        date: "Jul 14, 2024",
        content: `
            <h1>Building a CLI Tool in Go</h1>
            <p><strong>Posted by NASURIYA | Golang Development</strong></p>
            
            <h2>Why Go for CLI Tools?</h2>
            <p>Go is perfect for command-line tools. It compiles to a single binary, has excellent standard library support, and produces fast, efficient code. I recently built a file management tool in Go that's now used by 50+ developers.</p>
            
            <h2>Project Structure</h2>
            <p>Go's project structure is simple and predictable:</p>
            
            <pre><code>my-cli/
├── cmd/
│   └── root/
│       └── main.go
├── internal/
│   ├── commands/
│   └── utils/
├── go.mod
└── README.md</code></pre>
            
            <h2>Creating Commands</h2>
            <p>Go's cobra library makes CLI development straightforward:</p>
            
            <pre><code>var rootCmd = &cobra.Command{
    Use:   "mytool",
    Short: "A useful CLI tool",
    Run: func(cmd *cobra.Command, args []string) {
        fmt.Println("Hello from my tool!");
    },
}</code></pre>
            
            <h2>Flags and Options</h2>
            <p>Go's flag system is powerful and type-safe:</p>
            
            <pre><code>var verbose bool
rootCmd.Flags().BoolVarP(&verbose, "verbose", "v", false, "Enable verbose output")</code></pre>
            
            <h2>Error Handling</h2>
            <p>Go's error handling is explicit and clear:</p>
            
            <pre><code>func readFile(path string) ([]byte, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("failed to read file: %w", err)
    }
    return data, nil
}</code></pre>
            
            <h2>Testing</h2>
            <p>Go's testing framework is built-in and simple:</p>
            
            <pre><code>func TestMyFunction(t *testing.T) {
    result := myFunction("test")
    if result != "expected" {
        t.Errorf("Expected 'expected', got %q", result)
    }
}</code></pre>
            
            <h2>Conclusion</h2>
            <p>Go is an excellent choice for CLI tools. The simplicity, performance, and tooling make it a top choice for developers building command-line applications.</p>
        `
    },
    {
        title: "The Future of WebAssembly",
        tag: "WebTech",
        date: "Jun 30, 2024",
        content: `
            <h1>The Future of WebAssembly</h1>
            <p><strong>Posted by NASURIYA | Web Technologies</strong></p>
            
            <h2>What is WebAssembly?</h2>
            <p>WebAssembly (Wasm) is a binary instruction format for a stack-based virtual machine. It's designed as a portable compilation target for programming languages, enabling high-performance execution in web browsers.</p>
            
            <h2>Why Wasm Matters</h2>
            <p>Traditional JavaScript has limitations when it comes to performance-critical applications. WebAssembly bridges this gap by allowing code written in C++, Rust, and other languages to run at near-native speed in the browser.</p>
            
            <pre><code>// Rust example compiling to Wasm
#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u64 {
    if n <= 1 { return n }
    fibonacci(n-1) + fibonacci(n-2)
}</code></pre>
            
            <h2>Use Cases</h2>
            <ul>
                <li><strong>Game Development:</strong> Complex graphics and physics calculations</li>
                <li><strong>Video Processing:</strong> Real-time encoding and filtering</li>
                <li><strong>Machine Learning:</strong> Running ML models directly in browsers</li>
                <li><strong>Enterprise Apps:</strong> Legacy code migration without refactoring</li>
            </ul>
            
            <h2>Performance Comparison</h2>
            <p>In my benchmarks, WebAssembly runs 10-100x faster than JavaScript for compute-intensive tasks. However, the startup time can be slower due to compilation overhead.</p>
            
            <h2>Challenges</h2>
            <ul>
                <li><strong>Memory Management:</strong> Different from JavaScript's garbage collection</li>
                <li><strong>Ecosystem:</strong> Still growing compared to JavaScript</li>
                <li><strong>Tooling:</strong> Debugging and profiling can be complex</li>
            </ul>
            
            <h2>The Future</h2>
            <p>WebAssembly is still in its early stages. As the ecosystem matures, we'll see more languages targeting Wasm, better tooling, and broader browser support.</p>
            
            <blockquote>"WebAssembly isn't about replacing JavaScript—it's about extending what browsers can do."</blockquote>
            
            <h2>Conclusion</h2>
            <p>WebAssembly represents a paradigm shift in web development. While it won't replace JavaScript, it will complement it for performance-critical applications.</p>
        `
    },
    {
        title: "Optimizing React Performance",
        tag: "React",
        date: "May 18, 2024",
        content: `
            <h1>Optimizing React Performance</h1>
            <p><strong>Posted by NASURIYA | React Development</strong></p>
            
            <h2>The Performance Problem</h2>
            <p>React applications can become slow as they grow. Without proper optimization, you might experience laggy UI, slow rendering, and poor user experience.</p>
            
            <h2>Understanding Re-renders</h2>
            <p>Every time a parent component re-renders, all child components re-render too. This can cause unnecessary work:</p>
            
            <pre><code>// Bad: Forces re-render on every change
const Child = () => {
    return <div>{props.data}</div>;
};

// Good: Prevents unnecessary re-renders
const Child = React.memo(() => {
    return <div>{props.data}</div>;
});</code></pre>
            
            <h2>Key Optimization Techniques</h2>
            
            <h3>1. useMemo and useCallback</h3>
            <p>These hooks memoize values and functions to prevent unnecessary recalculations:</p>
            
            <pre><code>const expensiveValue = useMemo(() => {
    return calculateExpensive();
}, [dependency]);

const handleClick = useCallback(() => {
    doSomething();
}, []);</code></pre>
            
            <h3>2. Code Splitting</h3>
            <p>Split your app into smaller chunks to reduce initial bundle size:</p>
            
            <pre><code>const LazyComponent = React.lazy(() => import('./HeavyComponent'));

<React.Suspense fallback={<Loading />}>
    <LazyComponent />
</React.Suspense></code></pre>
            
            <h3>3. Virtualization</h3>
            <p>For long lists, only render visible items:</p>
            
            <pre><code>import { FixedSizeList } from 'react-window';

<FixedSizeList
    height={400}
    itemCount={items.length}
    itemSize={35}
></FixedSizeList></code></pre>
            
            <h3>4. Profiling</h3>
            <p>Use React DevTools Profiler to identify performance bottlenecks:</p>
            
            <pre><code>import { Profiler } from 'react-dom';

<Profiler id="MyComponent" onRender={onRenderCallback}>
    <MyComponent />
</Profiler></code></pre>
            
            <h2>Common Mistakes</h2>
            <ul>
                <li>Creating new objects/functions in render</li>
                <li>Forgetting to pass keys to lists</li>
                <li>Using inline styles with dynamic values</li>
                <li>Not using React.memo when needed</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>React performance optimization is about understanding the rendering lifecycle and applying the right techniques. Start profiling, then optimize based on real data.</p>
        `
    },
    {
        title: "Docker Networking Explained",
        tag: "DevOps",
        date: "Apr 05, 2024",
        content: `
            <h1>Docker Networking Explained</h1>
            <p><strong>Posted by NASURIYA | DevOps & Infrastructure</strong></p>
            
            <h2>Why Docker Networking Matters</h2>
            <p>Docker networking is one of the most misunderstood aspects of containerization. Understanding it is crucial for building reliable, scalable applications.</p>
            
            <h2>Network Types</h2>
            
            <h3>1. Bridge Network (Default)</h3>
            <p>Containers communicate via virtual Ethernet bridge:</p>
            
            <pre><code>docker network create mybridge
docker run --network mybridge myapp</code></pre>
            
            <h3>2. Host Network</h3>
            <p>Container shares host's network namespace (no isolation):</p>
            
            <pre><code>docker run --network host myapp</code></pre>
            
            <h3>3. Container Network</h3>
            <p>Share network with another container:</p>
            
            <pre><code>docker run --network container:existing_container_id myapp</code></pre>
            
            <h3>4. None Network</h3>
            <p>No networking at all (useful for offline containers):</p>
            
            <pre><code>docker run --network none myapp</code></pre>
            
            <h2>Custom Networks</h2>
            <p>Create isolated networks for microservices:</p>
            
            <pre><code>docker network create frontend-net
docker network create backend-net

# Services can't communicate across different networks
docker run --network frontend-net nginx
docker run --network backend-net node:app</code></pre>
            
            <h2>Docker Compose Networking</h2>
            <p>Compose automatically creates networks for services:</p>
            
            <pre><code>version: '3'
services:
  web:
    image: nginx
  api:
    image: node:app
    ports: ["3000:3000"]</code></pre>
            
            <h2>Advanced Topics</h2>
            
            <h3>Macvlan Mode</h3>
            <p>Assign containers real MAC addresses for external access:</p>
            
            <pre><code>docker network create -d macvlan \
    --subnet=192.168.1.0/24 \
    --gateway=192.168.1.1 \
    172.18.0.1</code></pre>
            
            <h3>DNS Resolution</h3>
            <p>Containers can resolve each other by service name:</p>
            
            <pre><code># Inside container:
ping api-service-name</code></pre>
            
            <h2>Troubleshooting</h2>
            <ul>
                <li>Check network status: <code>docker network ls</code></li>
                <li>Inspect containers: <code>docker inspect &lt;container&gt;</code></li>
                <li>View logs: <code>docker logs &lt;container&gt;</code></li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Docker networking is powerful but complex. Start with default networks, then add complexity as needed. Always test your network setup in staging before production.</p>
        `
    },
    {
        title: "Python for Data Science",
        tag: "Data",
        date: "Mar 22, 2024",
        content: `
            <h1>Python for Data Science</h1>
            <p><strong>Posted by NASURIYA | Data Science & Analytics</strong></p>
            
            <h2>Why Python Dominates Data Science</h2>
            <p>Python has become the de facto language for data science. Its simplicity, extensive libraries, and strong community make it ideal for everything from exploratory analysis to production ML models.</p>
            
            <h2>Essential Libraries</h2>
            
            <h3>Numpy</h3>
            <p>The foundation of numerical computing in Python:</p>
            
            <pre><code>import numpy as np

arr = np.array([1, 2, 3, 4, 5])
result = arr * 2
print(result)  # [2 4 6 8 10]</code></pre>
            
            <h3>Pandas</h3>
            <p>Data manipulation and analysis:</p>
            
            <pre><code>import pandas as pd

df = pd.read_csv('data.csv')
print(df.head())
print(df.describe())</code></pre>
            
            <h3>Matplotlib & Seaborn</h3>
            <p>Data visualization:</p>
            
            <pre><code>import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(10, 6))
sns.scatterplot(x='x', y='y', data=df)
plt.show()</code></pre>
            
            <h3>Scikit-Learn</h3>
            <p>Machine learning:</p>
            
            <pre><code>from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)
predictions = model.predict(X_test)</code></pre>
            
            <h2>Data Preprocessing</h2>
            <p>Cleaning and preparing data is crucial:</p>
            
            <pre><code># Handle missing values
df['column'].fillna(df['column'].mean(), inplace=True)

# Encode categorical variables
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['category'] = le.fit_transform(df['category'])</code></pre>
            
            <h2>Feature Engineering</h2>
            <p>Create new features from existing data:</p>
            
            <pre><code># Create polynomial features
from sklearn.preprocessing import PolynomialFeatures

poly = PolynomialFeatures(degree=2)
X_poly = poly.fit_transform(X)</code></pre>
            
            <h2>Model Evaluation</h2>
            <p>Assess model performance:</p>
            
            <pre><code>from sklearn.metrics import accuracy_score, classification_report

accuracy = accuracy_score(y_test, predictions)
print(classification_report(y_test, predictions))</code></pre>
            
            <h2>Deployment</h2>
            <p>Deploy models to production:</p>
            
            <pre><code># Save model
import joblib
joblib.dump(model, 'model.pkl')

# Load model
loaded_model = joblib.load('model.pkl')</code></pre>
            
            <h2>Conclusion</h2>
            <p>Python's ecosystem makes data science accessible to everyone. Start with pandas and numpy, then expand to machine learning as needed.</p>
        `
    },
    {
        title: "Serverless Architecture Patterns",
        tag: "Cloud",
        date: "Feb 14, 2024",
        content: `
            <h1>Serverless Architecture Patterns</h1>
            <p><strong>Posted by NASURIYA | Cloud Computing & Architecture</strong></p>
            
            <h2>What is Serverless?</h2>
            <p>Serverless computing doesn't mean no servers—it means you don't manage them. You pay only for actual compute time, not idle resources.</p>
            
            <h2>Core Patterns</h2>
            
            <h3>1. Event-Driven Architecture</h3>
            <p>Functions trigger on events (HTTP requests, file uploads, database changes):</p>
            
            <pre><code>// AWS Lambda example
exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    
    // Process data
    const result = await processData(body);
    
    return { statusCode: 200, body: JSON.stringify(result) };
};</code></pre>
            
            <h3>2. API Gateway Pattern</h3>
            <p>Use API Gateway as a single entry point:</p>
            
            <pre><code>// Serverless Framework
functions:
  myFunction:
    handler: src/handler.handler
    events:
      - http:
          path: /api/{proxy+}
          method: ANY</code></pre>
            
            <h3>3. Background Processing</h3>
            <p>Handle long-running tasks with queues:</p>
            
            <pre><code>// SQS + Lambda pattern
exports.processQueue = async (event) => {
    const messages = event.Records;
    
    for (const record of messages) {
        await processMessage(record.body);
    }
};</code></pre>
            
            <h3>4. Multi-Region Deployment</h3>
            <p>Deploy functions across multiple regions for redundancy:</p>
            
            <pre><code>// AWS CloudFormation
Resources:
  MyFunction:
    Type: AWS::Lambda::Function
    Properties:
      Runtime: nodejs14.x
      Handler: index.handler
      Code:
        S3Bucket: my-bucket
        S3Key: function.zip</code></pre>
            
            <h2>Cold Starts</h2>
            <p>Functions take time to initialize on first call:</p>
            
            <pre><code>// Mitigate cold starts
const cache = new Map();

async function processData(data) {
    if (cache.has('heavy-computation')) {
        return cache.get('heavy-computation');
    }
    
    const result = await heavyComputation();
    cache.set('heavy-computation', result);
    return result;
}</code></pre>
            
            <h2>Best Practices</h2>
            <ul>
                <li><strong>Keep functions small:</strong> Single responsibility principle</li>
                <li><strong>Use environment variables:</strong> Config management</li>
                <li><strong>Implement retry logic:</strong> Handle transient failures</li>
                <li><strong>Monitor costs:</strong> Track usage and optimize</li>
            </ul>
            
            <h2>When to Use Serverless</h2>
            <ul>
                <li>Variable workloads</li>
                <li>Event-driven applications</li>
                <li>Microservices</li>
                <li>Prototyping and MVPs</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Serverless architecture offers scalability and cost efficiency, but it requires careful design. Start small, measure performance, and optimize based on real data.</p>
        `
    },
    {
        title: "Understanding TCP Handshake",
        tag: "Networking",
        date: "Jan 08, 2024",
        content: `
            <h1>Understanding TCP Handshake</h1>
            <p><strong>Posted by NASURIYA | Networking & Protocols</strong></p>
            
            <h2>What is the TCP Three-Way Handshake?</h2>
            <p>The TCP three-way handshake is how TCP connections are established between two hosts. It ensures both parties agree on communication parameters before data transfer begins.</p>
            
            <h2>The Three Steps</h2>
            
            <h3>Step 1: SYN (Synchronize)</h3>
            <p>Client sends SYN packet with initial sequence number:</p>
            
            <pre><code>Client → Server: SYN=1, seq=x</code></pre>
            
            <h3>Step 2: SYN-ACK (Synchronize-Acknowledge)</h3>
            <p>Server responds with SYN and ACK:</p>
            
            <pre><code>Server → Client: SYN=1, ACK=1, seq=y, ack=x+1</code></pre>
            
            <h3>Step 3: ACK (Acknowledge)</h3>
            <p>Client acknowledges the server's SYN:</p>
            
            <pre><code>Client → Server: ACK=1, seq=x+1, ack=y+1</code></pre>
            
            <h2>TCP Flags Explained</h2>
            
            <h3>SYN (Synchronize)</h3>
            <p>Initiates connection establishment. Only used during handshake.</p>
            
            <h3>ACK (Acknowledge)</h3>
            <p>Confirms receipt of data. Used in all TCP communication.</p>
            
            <h3>RST (Reset)</h3>
            <p>Aborts connection abruptly. Used for error conditions.</p>
            
            <h3>FIN (Finish)</h3>
            <p>Initiates connection termination.</p>
            
            <h2>TCP State Machine</h2>
            <pre>
CLOSED → LISTEN → SYN_SENT → SYN_RECEIVED → ESTABLISHED → FIN_WAIT_1 → FIN_WAIT_2 → CLOSE_WAIT → LAST_ACK → CLOSED
    </pre>
            
            <h2>Common Issues</h2>
            
            <h3>Connection Timeout</h3>
            <p>SYN packet not received within timeout period:</p>
            
            <pre><code># Check firewall rules
iptables -L -n | grep tcp

# View connection status
netstat -an | grep ESTABLISHED</code></pre>
            
            <h3>Half-Open Connections</h3>
            <p>SYN received but no ACK:</p>
            
            <pre><code># View SYN_RECV connections
netstat -an | grep SYN_RECV</code></pre>
            
            <h2>TCP Window Scaling</h2>
            <p>Allows larger data transfers by scaling the receive window:</p>
            
            <pre><code># Check window scaling in tcpdump
tcpdump -i eth0 -n 'tcp[tcpflags] & 0x02 != 0' | grep -oP '(?<=Window=)[0-9]+'</code></pre>
            
            <h2>TCP Keepalive</h2>
            <p>Maintains connection by sending periodic probes:</p>
            
            <pre><code># Configure keepalive
sysctl -w net.ipv4.tcp_keepalive_time=600
sysctl -w net.ipv4.tcp_keepalive_intvl=10
sysctl -w net.ipv4.tcp_keepalive_probes=5</code></pre>
            
            <h2>Conclusion</h2>
            <p>Understanding TCP handshake is crucial for debugging network issues. The three-way handshake ensures reliable communication, but misconfigurations can cause connection problems.</p>
        `
    }
];

// Render Posts
articles.forEach((post, index) => {
    const div = document.createElement('article');
    div.innerHTML = `<h2>${post.title}</h2><span class="tag">${post.tag}</span><p>Posted on ${post.date}</p>`;
    div.addEventListener('click', () => openModal(index));
    blogFeed.appendChild(div);
});

// Modal Functions
function openModal(index) {
    const article = articles[index];
    modalBody.innerHTML = article.content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Pixel Cat Animation Logic
let frame = 0;
const catMap = [
    "  .--.  ",
    "/|     |\\",
    "| (o) (o)|",
    "|   ^    |",
    "\\_______/",
];

function drawCat() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Blink eyes randomly
    const blink = Math.random() > 0.95;
    let eyeChar = "o";
    if (blink) eyeChar = "_";

    // Draw simple pixel art based on frame
    ctx.fillStyle = "#ff9ff3"; // Pink cat
    for(let y=0; y<catMap.length; y++) {
        for(let x=0; x<catMap[y].length; x++) {
            if(catMap[y][x] !== ' ') {
                const px = (canvas.width / 2) - 4 + x;
                const py = (canvas.height / 2) - 3 + y;
                ctx.fillRect(px, py, 4, 4);
            }
        }
    }

    // Tail wagging effect
    if (frame % 10 === 0) {
        ctx.fillStyle = "#ff9ff3";
        ctx.fillRect(180, 160, 4, 20); 
    } else {
        ctx.clearRect(180, 160, 4, 20);
    }

    frame++;
    requestAnimationFrame(drawCat);
}

drawCat();
