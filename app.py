print("========== CareerCompass AI ==========")


name = input("enter your name:")
interest = input("What field are you interested in?")

print("\nHello", name)

if interest.lower() == "ai":
    print("Recommended Roadmap:")
    print("- Learn Python")
    print("- Learn Machine Learning")
    print("- Build AI Projects")

elif interest.lower() == "data science":
    print("Recommended Roadmap:")
    print("- Learn Python")
    print("- Learn Statistics")
    print("- Learn pandas and Numpy")

elif interest.lower() == "cybersecurity":
    print("Recommended Roadmap:")
    print("- Learn Networking")
    print("- Learn Linux")
    print("- Learn Ethical Hacking")

elif interest.lower() == "web development":
    print("Recommended Roadmap:")
    print("- Learn HTML")
    print("- Learn CSS")
    print("- Learn Javascript")

else:
    print("Sorry, we don't have a roadmap for that field yet.")

hours = int(input("How many hours can you study daily? "))

if hours >= 6:
    print("Plan: Intense Learning")
elif hours >= 3:
    print("Plan: Balanced Learning")
else:
    print("Plan: Beginner Learning")